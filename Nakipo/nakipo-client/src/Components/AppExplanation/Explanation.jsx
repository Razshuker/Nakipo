import { useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

export default function Explanation() {
    const [step, setStep] = useState(1);

    return (
        <div>
            {step === 1 && <FirstStep nextToStep02={() => {
                setStep(2);
            }} />}
            {step === 2 && <SecondStep nextToStep03={() => setStep(3)} />}
            {step === 3 && <ThirdStep />}
        </div>
    );
}
