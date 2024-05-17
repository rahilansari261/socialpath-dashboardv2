import GetPricingPlan from "@/components/get-pricing-plan";

import React from "react";

const page = ({ params }: { params: { planId: string } }) => {

  
  return <GetPricingPlan id={params.planId} />;
};

export default page;
