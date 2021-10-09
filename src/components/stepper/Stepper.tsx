import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Box from "../Box";
import { Chip } from "../Chip";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";

const StyledIcon = styled(Icon)`
@media only screen and (min-width: 678px) {
  display: none;
}
`;

const StyledChip = styled(Chip)`
@media only screen and (max-width: 678px) {
  font-size: 0px;
}
`;

type Step = {
  title: string;
  disabled: boolean;
  icon:string;
};

type StepperProps = {
  selectedStep?: number;
  stepperList: Step[];
  onChange?: (Step, index) => void;
};

const Stepper: React.FC<StepperProps> = ({
  selectedStep,
  stepperList,
  onChange,
}) => {
  const [selected, setSelected] = useState(selectedStep - 1);

  const handleStepClick = (step: Step, ind) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(step, ind);
    }
  };

  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);

  return (
    <FlexBox
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
      my="-4px"
    >
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <StyledChip
            bg={ind <= selected ? "primary.main" : "primary.light"}
            color={ind <= selected ? "white" : "primary.main"}
            p="0.5rem 1.5rem"
            fontSize="14px"
            fontWeight="600"
            my="4px"
            cursor={step.disabled ? "not-allowed" : "pointer"}
            onClick={handleStepClick(step, ind)}
          >
            {ind + 1}.
             <StyledIcon size="20px" color={ind <= selected ? "inherit" : "primary"}>{step.icon}</StyledIcon> 
            {step.title}
          </StyledChip>
          {ind < stepperList.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bg={ind < selected ? "primary.main" : "primary.light"}
            />
          )}
        </Fragment>
      ))}
    </FlexBox>
  );
};

Stepper.defaultProps = {
  selectedStep: 1,
};

export default Stepper;
