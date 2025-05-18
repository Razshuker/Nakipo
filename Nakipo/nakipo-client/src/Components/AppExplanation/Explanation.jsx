import { useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./SecondStep";

export default function Explanation() {
    const [step, setStep] = useState(1);

    return (
        <div>
            {step === 1 && <FirstStep nextToStep02={() => {
                setStep(2);
            }} />}
            {step === 2 && <SecondStep />}
        </div>
    );
}
