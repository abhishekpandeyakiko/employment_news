
import { useTranslation } from "react-i18next";

const Translate = ({ text, options = {} }) => {
  const { t } = useTranslation();
  return t(text, options);
};

export default Translate;
