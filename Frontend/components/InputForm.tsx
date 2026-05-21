import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import {
  DEFAULT_USER_INPUT,
  FORM_CONSTANTS,
  FORM_OPTIONS as HARDCODED_FORM_OPTIONS,
  VALIDATION_RULES,
} from "../configs/inputFormConfig";
import { fetchFormOptions } from '../services/api';
import { DESTINATION_IMAGES, INTERESTS_IMAGES } from "../configs/optionImages";
import { UserInput } from "../types";
import i18n from "../utils/i18n";

import BudgetStep from "./inputFormSteps/BudgetStep";
import TravelDateRangeStep from "./inputFormSteps/TravelDateRangeStep";
import CompanionsStep from "./inputFormSteps/CompanionsStep";
import DestinationStep from "./inputFormSteps/DestinationStep";
import MultiSelectStep from "./inputFormSteps/MultiSelectStep";

const FORM_STEPS = [
  "budget",
  "travelDateRange",
  "companions",
  "destination",
  "travelStyle",
  "interests",
  "dining",
  "accommodation",
] as const;

const InputForm: React.FC<{ onSubmit: (input: UserInput) => void }> = ({
  onSubmit,
}) => {
  const router = useRouter();
  const [input, setInput] = useState<UserInput>({
    ...DEFAULT_USER_INPUT,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .slice(0, 10),
    duration: 2,
  });
  const [budgetInput, setBudgetInput] = useState(''); // UI only
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [formOptions, setFormOptions] = useState(HARDCODED_FORM_OPTIONS);

  useEffect(() => {
    // Try to fetch dynamic form options from backend
    (async () => {
      try {
        const options = await fetchFormOptions();
        if (options) setFormOptions(options);
      } catch (e) {
        // fallback to hardcoded
      }
    })();
  }, []);

  // Helper to calculate days and nights
  const getDaysAndNights = (start: string, end: string) => {
    if (!start || !end) return { days: 0, nights: 0 };
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const nights = days > 0 ? days - 1 : 0;
    return { days, nights };
  };

  useEffect(() => {
    if (input.startDate && input.endDate) {
      const { days } = getDaysAndNights(input.startDate, input.endDate);
      setInput((prev) => ({
        ...prev,
        duration: days > 0 ? days : 0,
      }));
    }
  }, [input.startDate, input.endDate]);

  const validateStep = (): boolean => {
    const step = FORM_STEPS[currentStep];
    const newErrors: { [key: string]: string } = {};
    if (step === "budget") {
      const budgetValue = parseFloat(budgetInput) || 0;
      if (isNaN(budgetValue) || budgetValue < VALIDATION_RULES.MIN_BUDGET) {
        newErrors.budget = i18n.t("budget_too_low", {
          min: VALIDATION_RULES.MIN_BUDGET,
        });
      }
    }
    if (step === "travelDateRange") {
      if (!input.startDate || !input.endDate) {
        newErrors.dateRange = i18n.t("date_range_required");
      } else {
        const start = new Date(input.startDate);
        const end = new Date(input.endDate);
        if (end <= start) {
          newErrors.dateRange = i18n.t("end_date_after_start");
        }
        const { days } = getDaysAndNights(input.startDate, input.endDate);
        if (days <= 0) {
          newErrors.duration = i18n.t("duration_too_low", {
            min: VALIDATION_RULES.MIN_DURATION,
          });
        }
      }
    }
    if (step === "destination") {
      if (!input.destination || input.destination === "unknown") {
        newErrors.destination = i18n.t("destination_required");
      }
    }
    if (step === "companions") {
      if (
        (input.travelCompanions === "friends" ||
          input.travelCompanions === "family") &&
        (!input.numTourists ||
          isNaN(input.numTourists) ||
          input.numTourists < VALIDATION_RULES.MIN_NUM_TOURISTS)
      ) {
        newErrors.numTourists = i18n.t("num_tourists_required");
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit(input);
      setInput({
        ...DEFAULT_USER_INPUT,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
        duration: 2,
      });
      setBudgetInput(''); // if you use budgetInput as UI-only
      setCurrentStep(0);  // Optionally, reset to the first step
    }
  };

  // Calendar helpers
  const getDatesInRange = (start: string, end: string) => {
    const dates: { [date: string]: any } = {};
    let current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
      const dateStr = current.toISOString().slice(0, 10);
      if (dateStr === start && dateStr === end) {
        dates[dateStr] = {
          startingDay: true,
          endingDay: true,
          color: FORM_CONSTANTS.COLOR_TEAL,
          textColor: FORM_CONSTANTS.COLOR_TEXT_WHITE,
        };
      } else if (dateStr === start) {
        dates[dateStr] = {
          startingDay: true,
          color: FORM_CONSTANTS.COLOR_TEAL,
          textColor: FORM_CONSTANTS.COLOR_TEXT_WHITE,
        };
      } else if (dateStr === end) {
        dates[dateStr] = {
          endingDay: true,
          color: FORM_CONSTANTS.COLOR_RED,
          textColor: FORM_CONSTANTS.COLOR_TEXT_WHITE,
        };
      } else {
        dates[dateStr] = {
          color: FORM_CONSTANTS.COLOR_BLUE,
          textColor: FORM_CONSTANTS.COLOR_TEXT_DARK,
        };
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Render each step
  const renderStep = () => {
    const step = FORM_STEPS[currentStep];
    const L = FORM_CONSTANTS.LABEL_KEYS;
    switch (step) {
      case "budget":
        return (
          <BudgetStep
            value={budgetInput}
            onChange={(text) => {
              setBudgetInput(text);
              setInput((prev) => ({
                ...prev,
                budget: parseFloat(text) || 0,
              }));
            }}
            error={errors.budget}
            labelKey={L.budget}
            placeholderKey={L.enterBudget}
            styles={styles}
          />
        );
      case "travelDateRange": {
        const today = new Date();
        const minDate = today.toISOString().slice(0, 10);
        const maxDateObj = new Date(today);
        maxDateObj.setMonth(
          maxDateObj.getMonth() + FORM_CONSTANTS.DATE_RANGE_MONTHS
        );
        const maxDate = maxDateObj.toISOString().slice(0, 10);
        const markedDates =
          input.startDate && input.endDate
            ? getDatesInRange(input.startDate, input.endDate)
            : input.startDate && !input.endDate
            ? {
                [input.startDate]: {
                  startingDay: true,
                  endingDay: true,
                  color: FORM_CONSTANTS.COLOR_TEAL,
                  textColor: FORM_CONSTANTS.COLOR_TEXT_WHITE,
                },
              }
            : {};
        const { days, nights } = getDaysAndNights(
          input.startDate,
          input.endDate
        );

        return (
          <TravelDateRangeStep
            labelKey={L.travelDateRange}
            markedDates={markedDates}
            onDayPress={(day) => {
              const selected = day.dateString;
              if (!input.startDate || (input.startDate && input.endDate)) {
                setInput((prev) => ({
                  ...prev,
                  startDate: selected,
                  endDate: "",
                }));
              } else if (input.startDate && !input.endDate) {
                if (selected > input.startDate) {
                  setInput((prev) => ({
                    ...prev,
                    endDate: selected,
                  }));
                } else {
                  setInput((prev) => ({
                    ...prev,
                    startDate: selected,
                    endDate: "",
                  }));
                }
              }
            }}
            minDate={minDate}
            maxDate={maxDate}
            days={days}
            nights={nights}
            startDate={input.startDate}
            endDate={input.endDate}
            error={errors.dateRange}
            styles={styles}
          />
        );
      }
      case "companions":
        return (
          <CompanionsStep
            companions={input.travelCompanions}
            onCompanionChange={(value: string) => {
              let numTourists = input.numTourists;
              if (value === "solo") numTourists = 1;
              else if (value === "couple") numTourists = 2;
              // For friends/family, keep the current value (user input)
              setInput({
                ...input,
                travelCompanions: value as "solo" | "couple" | "friends" | "family",
                numTourists,
              });
            }}
            companionsOptions={formOptions.travelCompanions.slice()}
            numTourists={input.numTourists ?? 1}
            onNumTouristsChange={(text) => {
              const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
              setInput({ ...input, numTourists: isNaN(num) ? 0 : num });
            }}
            showNumTourists={
              input.travelCompanions === "friends" ||
              input.travelCompanions === "family"
            }
            numTouristsError={errors.numTourists}
            labelKey={L.companions}
            numTouristsLabel={L.numTourists}
            numTouristsPlaceholder={L.numTouristsPlaceholder}
            styles={styles}
          />
        );
      case "destination":
        return (
          <DestinationStep
            destination={input.destination}
            onDestinationChange={(value) =>
              setInput({ ...input, destination: value })
            }
            destinationOptions={formOptions.destinations.slice()}
            error={errors.destination}
            labelKey={L.destination}
            styles={styles}
            images={DESTINATION_IMAGES}
          />
        );
      case "travelStyle":
      case "interests":
      case "dining":
      case "accommodation":
        return (
          <MultiSelectStep
            step={step}
            options={formOptions.multiSelect[step]}
            selected={input[step] as string[]}
            onSelect={(option) =>
              setInput((prev) => ({
                ...prev,
                [step]: (prev[step] as string[]).includes(option)
                  ? (prev[step] as string[]).filter((item) => item !== option)
                  : [...(prev[step] as string[]), option],
              }))
            }
            error={errors[step]}
            styles={styles}
            images={step === "interests" ? INTERESTS_IMAGES : undefined}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {renderStep()}
      </View>
      <View style={styles.buttonRow}>
        {currentStep === 0 ? (
          <Button
            title={i18n.t("back") || "Back"}
            onPress={() => router.replace("/")}
          />
        ) : (
          <Button title={i18n.t("back") || "Back"} onPress={handleBack} />
        )}
        {currentStep < FORM_STEPS.length - 1 ? (
          <Button title={i18n.t("next") || "Next"} onPress={handleNext} />
        ) : (
          <Button title={i18n.t("submit") || "Submit"} onPress={handleSubmit} />
        )}
      </View>
      <Text style={styles.stepIndicator}>
        {i18n.t("step")} {currentStep + 1} / {FORM_STEPS.length}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 30, paddingTop: 30 },
  label: { fontSize: 16, fontWeight: "600", marginVertical: 12, color: "#000" },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  picker: { marginVertical: 10, backgroundColor: "#fff", borderRadius: 8 },
  multiSelectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 8,
  },
  multiSelectItemWrapper: {
    width: "48%",
    marginBottom: 12,
  },
  multiSelectItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 8,
    color: "#333",
    borderRadius: 8,
  },
  optionImageSmall: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 4,
  },
  multiSelectText: { marginLeft: 8, fontSize: 14, color: "#333" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 8,
  },
  stepIndicator: {
    textAlign: "center",
    color: "#888",
    marginTop: 8,
    fontSize: 12,
  },
  error: { color: FORM_CONSTANTS.COLOR_ERROR, fontSize: 12, marginBottom: 10 },
  dateDiff: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default InputForm;
