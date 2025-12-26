import AboutAdmin from "@/components/Home/AboutAdmin";
import Curriculum from "@/components/Home/Curriculum";
import Hero from "@/components/Home/Hero";
import Certificate from "@/components/Home/Certificate";
import Community from "@/components/Home/Community";
import Contact from "@/components/Home/Contact";
import Pricing from "@/components/Home/Pricing";
import Solve from "@/components/Home/Solve";
import WhatProjectYoDO from "@/components/Home/WhatProjectYoDO";
import WhatYouLearn from "@/components/Home/WhatYouLearn";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <WhatYouLearn />
      <Curriculum />

      <Pricing />
      <Certificate />
      <Community />
      <Contact />

      <Solve />
      <WhatProjectYoDO />
      <AboutAdmin />
    </div>
  );
};

export default page;
