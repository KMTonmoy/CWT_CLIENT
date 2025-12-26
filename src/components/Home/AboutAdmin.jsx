import React from 'react'

const AboutAdmin = () => {
  return (
    <div className="my-16 px-4 md:px-10">
      <h1 className="text-center text-4xl font-bold text-[#f1f5f9] mb-10">
        প্রতিষ্ঠাতা সম্পর্কে কিছু কথা
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        <img
          className="w-[300px] md:w-[400px] rounded-2xl border-4 border-white shadow-lg"
          src="https://res.cloudinary.com/dgwknm4yi/image/upload/v1750562558/WhatsApp_Image_2025-06-13_at_16.52.00_338970cf_bkoiqi.jpg"
          alt="Tonmoy Ahamed"
        />

        <div className="text-white max-w-xl leading-8">
          <p>
            তন্ময় আহমেদ একজন প্রযুক্তিপ্রেমী ও উদ্যমী উদ্যোক্তা, যিনি বাংলাদেশের তরুণ প্রজন্মকে
            প্রযুক্তি শিক্ষায় দক্ষ করে গড়ে তোলার স্বপ্ন দেখেন। তার আগ্রহ মূলত ওয়েব ডেভেলপমেন্ট,
            সফটওয়্যার আর্কিটেকচার এবং শিক্ষামূলক কনটেন্ট তৈরিতে। প্রোগ্রামিং শেখা ও শেখানোর প্রতি
            তার গভীর ভালোবাসা থেকেই তিনি একটি পূর্ণাঙ্গ অনলাইন প্ল্যাটফর্ম তৈরি করেছেন, যেখানে
            শিক্ষার্থীরা নিজ ভাষায় সহজভাবে কোডিং শিখতে পারে।
          </p>
          <br />
          <p>
            তিনি নিজে একজন অভিজ্ঞ ফুল-স্ট্যাক ওয়েব ডেভেলপার এবং আধুনিক প্রযুক্তি ব্যবহারে পারদর্শী।
            তার লক্ষ্য হলো প্রযুক্তির মাধ্যমে সমাজে ইতিবাচক পরিবর্তন আনা এবং আন্তর্জাতিক মানের
            ডেভেলপার তৈরি করা, যারা বাংলাদেশকে গর্বিত করতে পারে।
          </p>
          <br />
          <p className="font-semibold text-lg">তন্ময় আহমেদ</p>
          <p className="text-sm">প্রতিষ্ঠাতা - CodeWithTonmoy</p>
        </div>
      </div>
    </div>
  )
}

export default AboutAdmin
