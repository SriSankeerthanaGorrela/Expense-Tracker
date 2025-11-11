"use client";
import React, { useState } from "react";
import ThirdStep from "./thirdStep";
import SecondStep from "./SecondStep";
import FirstStep from "./FirstStep";

export default function StepProgressCard() {
  const [currentStep, setCurrentStep] = useState(1); // step: 1–3

  const steps = [1, 2, 3]; 
  const RenderStepContent=() => {
    switch (currentStep) {
      case 1:
        return <FirstStep onContinue={() => setCurrentStep(2)} />;
      case 2:
        return <SecondStep onContinue={() => setCurrentStep(3)} />;
      case 3 :
      return <ThirdStep/>
   }
    }
  

  return (
    <div className="max-w-5xl mx-auto space-y-2 mt-5  bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
      <h2 className="text-3xl font-semibold  gradient-text">
       Welcome
      </h2>
   <p>Lets set up your finaical profile to get started</p>
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center w-full">
            {/* Circle */}
            {/* <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold 
              ${currentStep >= step ? " text-white" : "bg-gray-200 text-gray-600"}
              transition-all duration-300`}
            >
              {step}
            </div> */}
             
            {/* Line between circles (except after last step) */}
            {index < steps.length  && (
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full relative">
                <div
                  className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${
                    currentStep >= step ? "bg-gradient-to-r from-blue-400 to-teal-500 w-full" : "bg-gradient-to-r from-blue-400 to-teal-500 w-0"
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
          {RenderStepContent()}

      {/* Step Description */}
      <p className="text-sm text-gray-500 mb-4">
        Step {currentStep} of 3 completed
      </p>
      {currentStep>1 && ( <button
        disabled={currentStep===1}
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          className="btn-primary"
        >
          Previous
        </button>)}

      
    </div>
  );
}