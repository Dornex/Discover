import styled, { css } from "styled-components/native";
interface Debuggable {
  debug?: boolean;
}

const debugCss = ({ debug }: { debug?: boolean }) =>
  debug
    ? css`
        border: 1px solid red;
      `
    : css``;

interface IStyledText extends Debuggable {
  fontSize?: number | undefined;
  color?: string | undefined;
  fontWeight?: number | string | undefined;
  fontFamily?: string | undefined;
  letterSpacing?: number | undefined;
}

const StyledText = styled.Text<IStyledText>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  ${({ letterSpacing }) =>
    letterSpacing ? `letterSpacing: ${letterSpacing}px` : null}
  ${debugCss}
`;

StyledText.defaultProps = {
  color: "black",
  fontSize: 18,
  fontWeight: "normal",
  fontFamily: "Roboto",
};

export default StyledText;
