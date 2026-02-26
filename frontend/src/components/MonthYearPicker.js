import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" }
];

// Generate years from 1960 to current year + 1
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1959 }, (_, i) => currentYear - i);

const MonthYearPicker = ({ 
  value, 
  onChange, 
  label, 
  required = false,
  placeholder = "Select date",
  theme = "dark",
  testId = "date-picker"
}) => {
  // Parse existing value (format: YYYY-MM-DD or YYYY-MM)
  const parseDate = (dateStr) => {
    if (!dateStr) return { month: "", year: "" };
    const parts = dateStr.split("-");
    return {
      year: parts[0] || "",
      month: parts[1] || ""
    };
  };

  const [selectedMonth, setSelectedMonth] = useState(parseDate(value).month);
  const [selectedYear, setSelectedYear] = useState(parseDate(value).year);

  // Update internal state when value prop changes
  useEffect(() => {
    const parsed = parseDate(value);
    setSelectedMonth(parsed.month);
    setSelectedYear(parsed.year);
  }, [value]);

  // Notify parent when selection changes
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    if (month && selectedYear) {
      onChange(`${selectedYear}-${month}-01`);
    } else if (!month && !selectedYear) {
      onChange("");
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    if (selectedMonth && year) {
      onChange(`${year}-${selectedMonth}-01`);
    } else if (!selectedMonth && !year) {
      onChange("");
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label} {required && <span className="text-[#A1D8E0]">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        {/* Month Select */}
        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger 
            className={`h-12 flex-1 rounded-xl ${
              isDark 
                ? 'bg-black/30 border-white/[0.08] text-white hover:border-white/20' 
                : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300'
            } focus:border-[#00677F] focus:ring-2 focus:ring-[#00677F]/20 transition-all duration-300`}
            data-testid={`${testId}-month`}
          >
            <div className="flex items-center gap-2">
              <Calendar className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
              <SelectValue placeholder="Month" />
            </div>
          </SelectTrigger>
          <SelectContent className={isDark ? 'bg-[#1a1f2e] border-white/10' : ''}>
            {months.map((month) => (
              <SelectItem 
                key={month.value} 
                value={month.value}
                className={isDark ? 'text-white hover:bg-white/10 focus:bg-white/10' : ''}
              >
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Select */}
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger 
            className={`h-12 w-28 rounded-xl ${
              isDark 
                ? 'bg-black/30 border-white/[0.08] text-white hover:border-white/20' 
                : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300'
            } focus:border-[#00677F] focus:ring-2 focus:ring-[#00677F]/20 transition-all duration-300`}
            data-testid={`${testId}-year`}
          >
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className={`max-h-60 ${isDark ? 'bg-[#1a1f2e] border-white/10' : ''}`}>
            {years.map((year) => (
              <SelectItem 
                key={year} 
                value={year.toString()}
                className={isDark ? 'text-white hover:bg-white/10 focus:bg-white/10' : ''}
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MonthYearPicker;
