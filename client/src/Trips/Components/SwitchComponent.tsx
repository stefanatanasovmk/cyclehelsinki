import { FormControlLabel, Switch } from "@mui/material";

interface Props {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
  style: object;
  labelPlacement: "end" | "start" | "top" | "bottom" | undefined;
}

export default function SwitchComponent({
  value = false,
  setValue,
  label,
  style,
  labelPlacement = "end",
}: Props): JSX.Element {
  return (
    <FormControlLabel
      style={style !== undefined ? style : {}}
      control={
        <Switch
          checked={value}
          onChange={() => (value ? setValue(false) : setValue(true))}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  );
}
