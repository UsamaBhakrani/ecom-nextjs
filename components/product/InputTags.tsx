"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { InputProps } from "../ui/input";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

const InputTags = ({ onChange, value }: InputTagsProps) => {
  const [pendingDataPoint, setPendingDataPoint] = useState("");
  const [focused, setFocused] = useState(false);

  return <div>InputTags</div>;
};

export default InputTags;
