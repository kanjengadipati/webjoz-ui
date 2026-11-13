"use client";

/**
 * VariantPicker — backward-compat re-export.
 *
 * VariantPicker sekarang adalah alias dari CustomSelect dengan variant="visual".
 * Gunakan CustomSelect dengan prop variant="visual" untuk penggunaan baru.
 */

import React from "react";
import { CustomSelect, type CustomSelectProps, type CustomSelectOption } from "./custom-select";

export type VariantOption = CustomSelectOption;

export interface VariantPickerProps
  extends Omit<CustomSelectProps, "variant" | "size"> {
  allLabel?: string;
  hintText?: string;
  doneLabel?: string;
}

export function VariantPicker(props: VariantPickerProps) {
  return <CustomSelect {...props} variant="visual" />;
}
