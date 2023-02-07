import { styled } from "@stitches/react";

export const HeaderContainer = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CartButton = styled("button", {
  all: "unset",
  cursor: "pointer",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  background: "$gray800",
  position: "relative",
  padding: "0.75rem",

  "> div": {
    position: "absolute",
    height: "1.5rem",
    width: "1.5rem",
    background: "$green500",
    color: "$white",
    fontWeight: 700,
    fontSize: "0.875rem",
    top: -5,
    right: -5,
    border: "2px solid $gray900",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  svg: {
    fontSize: "1.5rem",
  },
});
