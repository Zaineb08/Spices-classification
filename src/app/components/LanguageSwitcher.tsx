import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Select
        value={i18n.language}
        onValueChange={(lang) => i18n.changeLanguage(lang)}
      >
        <SelectTrigger className="w-32 bg-white border-2 border-amber-200 shadow-lg">
          <SelectValue placeholder={t("language")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
