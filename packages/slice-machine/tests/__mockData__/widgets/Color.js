export const valid = {
  __pass: true,
  type: "Color",
  config: {
    label: "Color",
    placeholder: "hex Color"
  }
}

export const wrongType = {
  __pass: false,
  type: "Color2",
  config: {
    label: "Color",
    placeholder: "hex Color"
  }
}

export const noConfig = {
  __pass: false,
  type: "Color",
}
