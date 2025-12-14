import AboutAdmin from '@/components/AboutAdmin';
import Curriculum from '@/components/Curriculum';
import Hero from '@/components/Hero';
import Solve from '@/components/Solve';
import WhatProjectYoDO from '@/components/WhatProjectYoDO';
import WhatYouLearn from '@/components/WhatYouLearn';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <WhatYouLearn />

      <Curriculum />
      <Solve />
      <WhatProjectYoDO />
      <AboutAdmin />
    </div>
  );
};

export default page;
