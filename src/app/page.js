import AboutAdmin from "@/components/AboutAdmin";
import Curriculum from "@/components/Curriculum";
import Hero from "@/components/Hero";
import Certificate from "@/components/Home/Certificate";
import Community from "@/components/Home/Community";
import Contact from "@/components/Home/Contact";
import Pricing from "@/components/Home/Pricing";
import Solve from "@/components/Solve";
import WhatProjectYoDO from "@/components/WhatProjectYoDO";
import WhatYouLearn from "@/components/WhatYouLearn";
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
