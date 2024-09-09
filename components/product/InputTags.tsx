"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Input, InputProps } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

const InputTags = ({ onChange, value }: InputTagsProps) => {
  const [pendingDataPoint, setPendingDataPoint] = useState("");
  const [focused, setFocused] = useState(false);

  const addPendingDataPoint = () => {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...value, pendingDataPoint]);
      onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  };

  const { setFocus } = useFormContext();

  return (
    <div
      className={
        (cn(
          "flex min-h-[40px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        ),
        focused
          ? "ring-offset-2 outline-none ring-ring ring-2"
          : "ring-offset-0 outline-none ring-ring ring-0")
      }
      onClick={() => setFocus("tags")}
    >
      <motion.div className="rounded-md min-h-[2.5rem] p-2 flex gap-2 flex-wrap items-center">
        <AnimatePresence>
          {value.map((tag) => {
            return (
              <motion.div
                key={tag}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
              >
                <Badge variant="secondary">{tag}</Badge>
                <Button
                  onClick={() => onChange(value.filter((i) => i !== tag))}
                >
                  <XIcon className="w-3" />
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div className="flex">
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPendingDataPoint();
              }
              if (
                e.key === "Backspace" &&
                !pendingDataPoint &&
                value.length > 0
              ) {
                e.preventDefault();
                const newValue = [...value];
                newValue.pop();
                onChange(newValue);
              }
            }}
            value={pendingDataPoint}
            onFocus={() => setFocused(true)}
            onBlurCapture={() => setFocused(false)}
            onChange={(e) => setPendingDataPoint(e.target.value)}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default InputTags;
