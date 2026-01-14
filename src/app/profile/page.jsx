"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import axios from "axios";
import {
  FiCamera,
  FiUpload,
  FiSave,
  FiEdit,
  FiX,
  FiMail,
  FiCheck,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
  
 
const Profile = () => {
   
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState({
    isVerified: false,
    isPending: false,
    attemptsLeft: 4,
    cooldownUntil: null,
  });
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const fileInputRef = useRef(null);
  const codeInputRef = useRef(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://cwt-server.vercel.app";
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (user) {
      fetchProfileData();
      checkVerificationStatus();
    }
  }, [user]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users/uid/${user.uid}`);
      if (response.data.success) {
        setProfileData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage({ type: "error", text: "Failed to load profile data" });
    } finally {
      setLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/email/verification-status/${user.uid}`
      );
      if (response.data.success) {
        setVerificationStatus({
          isVerified: response.data.isVerified,
          isPending: response.data.isPending,
          attemptsLeft: response.data.attemptsLeft,
          cooldownUntil: response.data.cooldownUntil,
        });

        if (response.data.cooldownUntil) {
          const cooldownMs = new Date(response.data.cooldownUntil) - new Date();
          if (cooldownMs > 0) {
            setCountdown(Math.ceil(cooldownMs / 1000));
          }
        }
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
    }
  };

  const sendVerificationCode = async () => {
    try {
      setIsSendingCode(true);
      setMessage({ type: "", text: "" });

      const response = await axios.post(
        `${BASE_URL}/api/email/send-verification`,
        {
          email: profileData.email,
          userId: user.uid,
          userName: profileData.name,
        }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: `Verification code sent to ${profileData.email}`,
        });
        setShowVerificationModal(true);
        setVerificationStatus((prev) => ({
          ...prev,
          isPending: true,
          attemptsLeft: 4,
        }));

        setTimeout(() => {
          if (codeInputRef.current) {
            codeInputRef.current.focus();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Failed to send verification code",
      });

      if (error.response?.data?.cooldownUntil) {
        const cooldownMs =
          new Date(error.response.data.cooldownUntil) - new Date();
        if (cooldownMs > 0) {
          setCountdown(Math.ceil(cooldownMs / 1000));
          setVerificationStatus((prev) => ({
            ...prev,
            cooldownUntil: error.response.data.cooldownUntil,
          }));
        }
      }
    } finally {
      setIsSendingCode(false);
    }
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      setMessage({ type: "error", text: "Please enter a 6-digit code" });
      return;
    }

    try {
      setIsVerifyingCode(true);
      setMessage({ type: "", text: "" });

      const response = await axios.post(`${BASE_URL}/api/email/verify-code`, {
        email: profileData.email,
        code: verificationCode,
        userId: user.uid,
      });

      if (response.data.success) {
        setMessage({
          type: "success",
          text: "Email verified successfully!",
        });
        setVerificationStatus({
          isVerified: true,
          isPending: false,
          attemptsLeft: 4,
          cooldownUntil: null,
        });
        setShowVerificationModal(false);
        setVerificationCode("");

        setProfileData((prev) => ({
          ...prev,
          emailVerified: true,
        }));
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      const errorMessage =
        error.response?.data?.message || "Invalid verification code";
      setMessage({ type: "error", text: errorMessage });

      if (error.response?.data?.attemptsLeft !== undefined) {
        setVerificationStatus((prev) => ({
          ...prev,
          attemptsLeft: error.response.data.attemptsLeft,
        }));
      }

      if (error.response?.data?.cooldownUntil) {
        const cooldownMs =
          new Date(error.response.data.cooldownUntil) - new Date();
        if (cooldownMs > 0) {
          setCountdown(Math.ceil(cooldownMs / 1000));
          setVerificationStatus((prev) => ({
            ...prev,
            cooldownUntil: error.response.data.cooldownUntil,
          }));
          setShowVerificationModal(false);
        }
      }

      setVerificationCode("");
      if (codeInputRef.current) {
        codeInputRef.current.focus();
      }
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size should be less than 10MB" });
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      setMessage({
        type: "error",
        text: "Only image files (JPG, PNG, GIF, WebP) are allowed",
      });
      return;
    }

    try {
      setUploadingPhoto(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
      formData.append("folder", "cwt-profiles");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      if (response.data.secure_url) {
        const updateResponse = await axios.patch(
          `${BASE_URL}/api/users/uid/${user.uid}`,
          { photoURL: response.data.secure_url }
        );

        if (updateResponse.data.success) {
          setProfileData((prev) => ({
            ...prev,
            photoURL: response.data.secure_url,
          }));
          setMessage({
            type: "success",
            text: "Profile photo updated successfully!",
          });
        }
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to upload photo",
      });
    } finally {
      setUploadingPhoto(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfileData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const dataToSend = {
        ...profileData,
        updatedAt: new Date().toISOString(),
      };

      const response = await axios.patch(
        `${BASE_URL}/api/users/uid/${user.uid}`,
        dataToSend
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        fetchProfileData();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 text-xl mb-4">Profile not found</p>
          <button
            onClick={fetchProfileData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                My Profile
              </h1>
              <p className="text-gray-400">
                Manage your account information and settings
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                  isEditing
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isEditing ? (
                  <>
                    <FiX size={18} />
                    Cancel
                  </>
                ) : (
                  <>
                    <FiEdit size={18} />
                    Edit Profile
                  </>
                )}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <FiSave size={18} />
                  {saving ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-500/20 border border-green-500/30 text-green-400"
                : "bg-red-500/20 border border-red-500/30 text-red-400"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                message.type === "success" ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>
            <span>{message.text}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
            >
              <div className="flex flex-col items-center">
                <div className="relative group mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg">
                    {profileData.photoURL ? (
                      <img
                        src={profileData.photoURL}
                        alt={profileData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">
                          {profileData.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={triggerFileInput}
                    disabled={uploadingPhoto}
                    className="absolute bottom-2 right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-110 transition-transform"
                    title="Change profile photo"
                  >
                    {uploadingPhoto ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <FiCamera size={20} className="text-white" />
                    )}
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {uploadingPhoto && (
                  <div className="w-full mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <h2 className="text-2xl font-bold text-white mb-1">
                  {profileData.name}
                </h2>
                <p className="text-gray-400 mb-3">{profileData.email}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      profileData.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {profileData.status?.charAt(0)?.toUpperCase() +
                      profileData.status?.slice(1) || "Active"}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium capitalize">
                    {profileData.role || "Student"}
                  </span>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white font-medium">
                      {formatDate(profileData.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Login</span>
                    <span className="text-white font-medium">
                      {formatDate(profileData.lastLogin)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-white font-medium">
                      {formatDate(profileData.updatedAt)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={triggerFileInput}
                  disabled={uploadingPhoto}
                  className="mt-6 w-full py-3 bg-gray-700/50 border border-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FiUpload size={18} />
                  {uploadingPhoto ? "Uploading..." : "Change Profile Photo"}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Email Verified</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      profileData.emailVerified
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {profileData.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Phone Verified</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      profileData.phoneVerified
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {profileData.phoneVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Personal Information
              </h3>

              <div className="space-y-8">
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                    Email Verification
                  </h4>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            verificationStatus.isVerified
                              ? "bg-green-500/20"
                              : "bg-yellow-500/20"
                          }`}
                        >
                          {verificationStatus.isVerified ? (
                            <FiCheck className="text-green-400" size={20} />
                          ) : (
                            <FiMail className="text-yellow-400" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {profileData.email}
                          </p>
                          <p
                            className={`text-sm ${
                              verificationStatus.isVerified
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {verificationStatus.isVerified
                              ? "✓ Email verified"
                              : verificationStatus.isPending
                              ? "⏳ Verification pending"
                              : "⚠️ Email not verified"}
                          </p>
                        </div>
                      </div>

                      {!verificationStatus.isVerified && (
                        <button
                          onClick={sendVerificationCode}
                          disabled={isSendingCode || countdown > 0}
                          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                            countdown > 0
                              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {isSendingCode ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Sending...
                            </>
                          ) : countdown > 0 ? (
                            <>
                              <FiClock />
                              {formatTime(countdown)}
                            </>
                          ) : (
                            <>
                              <FiMail />
                              Verify Email
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {!verificationStatus.isVerified && (
                      <div className="mt-3 text-sm text-gray-400">
                        {verificationStatus.isPending && (
                          <p className="flex items-center gap-2 mb-2">
                            <FiAlertCircle />
                            Verification code sent. Check your email.
                          </p>
                        )}
                        <p>
                          Attempts remaining:{" "}
                          <span className="font-bold text-white">
                            {verificationStatus.attemptsLeft}/4
                          </span>
                        </p>
                        <p className="text-xs mt-1">
                          After 4 failed attempts, 24-hour cooldown
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p className="text-white text-lg py-2">
                          {profileData.name || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <p className="text-white text-lg py-2">
                        {profileData.email}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-white text-lg py-2">
                          {profileData.phone || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="birthDate"
                          value={profileData.birthDate?.split("T")[0] || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-white text-lg py-2">
                          {profileData.birthDate
                            ? formatDate(profileData.birthDate)
                            : "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                    Address Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={profileData.address || ""}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="Enter your address"
                        />
                      ) : (
                        <p className="text-white py-2">
                          {profileData.address || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Postal Code
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postCode"
                          value={profileData.postCode || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter postal code"
                        />
                      ) : (
                        <p className="text-white text-lg py-2">
                          {profileData.postCode || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={profileData.city || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your city"
                        />
                      ) : (
                        <p className="text-white text-lg py-2">
                          {profileData.city || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                    Additional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={profileData.bio || ""}
                          onChange={handleInputChange}
                          rows="4"
                          placeholder="Tell us about yourself..."
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      ) : (
                        <p className="text-white py-2">
                          {profileData.bio || "No bio provided"}
                        </p>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Education
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="education"
                            value={profileData.education || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your education background"
                          />
                        ) : (
                          <p className="text-white text-lg py-2">
                            {profileData.education || "Not provided"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Occupation
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="occupation"
                            value={profileData.occupation || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your current occupation"
                          />
                        ) : (
                          <p className="text-white text-lg py-2">
                            {profileData.occupation || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                      Social Links
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        "facebook",
                        "twitter",
                        "linkedin",
                        "github",
                        "portfolio",
                      ].map((platform) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                            {platform} URL
                          </label>
                          <input
                            type="url"
                            name={`socialLinks.${platform}`}
                            value={profileData.socialLinks?.[platform] || ""}
                            onChange={handleInputChange}
                            placeholder={`https://${platform}.com/yourusername`}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                      Notification Preferences
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(
                        profileData.notifications || {
                          email: true,
                          sms: false,
                          push: true,
                        }
                      ).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`notif-${key}`}
                            name={`notifications.${key}`}
                            checked={value}
                            onChange={handleInputChange}
                            className="h-5 w-5 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 focus:ring-2"
                          />
                          <label
                            htmlFor={`notif-${key}`}
                            className="ml-3 text-sm text-white capitalize"
                          >
                            {key} notifications
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                Verify Your Email
              </h3>
              <button
                onClick={() => {
                  setShowVerificationModal(false);
                  setVerificationCode("");
                }}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">
                Enter the 6-digit verification code sent to:
                <br />
                <span className="font-bold text-white">
                  {profileData?.email}
                </span>
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Verification Code
                </label>
                <input
                  ref={codeInputRef}
                  type="text"
                  value={verificationCode}
                  onChange={(e) =>
                    setVerificationCode(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={6}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowVerificationModal(false);
                    setVerificationCode("");
                  }}
                  className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={verifyCode}
                  disabled={isVerifyingCode || verificationCode.length !== 6}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isVerifyingCode ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={sendVerificationCode}
                  disabled={isSendingCode || countdown > 0}
                  className="text-blue-400 hover:text-blue-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingCode ? "Sending..." : "Resend Code"}
                </button>
              </div>

              {verificationStatus.attemptsLeft < 4 && (
                <div className="text-center text-sm text-yellow-400">
                  <FiAlertCircle className="inline-block mr-1" />
                  {verificationStatus.attemptsLeft} attempts remaining
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
