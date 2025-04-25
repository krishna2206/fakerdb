import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { dateRangeTemplate } from "@/templates";
import { TemplateData, TemplateVariation } from "@/types/types";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import {
  formatDateForDisplay,
  generateExampleDateValues,
  getDateFormatOptions,
  getDefaultDateRanges,
} from "../../utils/dateUtils";
import { findTemplateVariation, truncateText } from "../../utils/templateUtils";

export interface DateRangePickerProps {
  onApply: (template: TemplateData, variation: TemplateVariation) => void;
  onBack: () => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onApply,
  onBack,
}) => {
  const customRangeVariation = findTemplateVariation(dateRangeTemplate, "Custom Range");

  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [dateFormat, setDateFormat] = useState<string>("YYYY-MM-DD");
  const [dateRangeVariation, setDateRangeVariation] =
    useState<TemplateVariation | null>(customRangeVariation || null);

  const isCustomRange = dateRangeVariation?.name === "Custom Range";

  const handleVariationChange = (value: string) => {
    const variation = dateRangeTemplate.variations.find(
      (v) => v.name === value
    );
    if (variation) {
      setDateRangeVariation(variation);

      // Set start and end dates based on the selected variation
      const defaultRanges = getDefaultDateRanges();
      if (defaultRanges[variation.name]) {
        const { startDate: start, endDate: end } =
          defaultRanges[variation.name];
        setStartDate(start);
        setEndDate(end);
      }
    }
  };

  const handleApply = () => {
    if (!dateRangeVariation || !startDate || !endDate) return;

    // Format dates according to the selected format
    const startFormatted = formatDateForDisplay(startDate, dateFormat);
    const endFormatted = formatDateForDisplay(endDate, dateFormat);

    // Create a modified variation with the custom context hint
    const customVariation: TemplateVariation = {
      ...dateRangeVariation,
      contextHint: `Generate dates between ${startFormatted} and ${endFormatted} in ${dateFormat} format`,
      exampleValues: generateExampleDateValues(startDate, endDate, dateFormat),
    };

    // Apply the template with the custom variation
    onApply(dateRangeTemplate, customVariation);
  };

  const renderExampleBadges = (examples: string[]): React.ReactNode => {
    return (
      <div className="flex flex-wrap gap-1">
        {examples.map((example, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs font-normal bg-background/60 px-1.5 py-0 h-5"
            title={example}
          >
            {truncateText(example)}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" className="mb-2" onClick={onBack}>
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Templates
      </Button>

      <h3 className="font-medium text-sm">Select Date Range</h3>

      <div className="space-y-2">
        <label className="text-sm font-medium">Range Type</label>
        <Select
          value={dateRangeVariation?.name || ""}
          onValueChange={handleVariationChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a range type" />
          </SelectTrigger>
          <SelectContent>
            {dateRangeTemplate.variations.map((variation) => (
              <SelectItem key={variation.id} value={variation.name}>
                {variation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Date Format</label>
        <Select value={dateFormat} onValueChange={setDateFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Select a date format" />
          </SelectTrigger>
          <SelectContent>
            {getDateFormatOptions().map((format) => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isCustomRange && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      {!isCustomRange && dateRangeVariation && (
        <div className="p-3 border rounded-md bg-accent/10">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Selected Range</h4>
            <Badge variant="outline">{dateRangeVariation.name}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Start Date:</p>
              <p>{startDate ? format(startDate, "PPP") : "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">End Date:</p>
              <p>{endDate ? format(endDate, "PPP") : "-"}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 border rounded-md bg-muted/30">
        <h4 className="text-sm font-medium mb-2">Sample Values</h4>
        {startDate && endDate && (
          <div className="space-y-1">
            {renderExampleBadges(
              generateExampleDateValues(startDate, endDate, dateFormat)
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Context Hint: Generate dates between{" "}
              {formatDateForDisplay(startDate, dateFormat)} and{" "}
              {formatDateForDisplay(endDate, dateFormat)} in {dateFormat} format
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleApply}
          disabled={!startDate || !endDate || !dateRangeVariation}
        >
          Apply Date Range
        </Button>
      </div>
    </div>
  );
};
