"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle, Calculator, Languages, TrendingUp, DollarSign, Calendar, Award } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

const translations = {
  eng: {
    calculatorTitle: "Pension Benefits Calculator",
    calculatorDesc: "Enter your information to calculate your pension benefits",
    salaryLabel: "Best Salary per Month (Tsh):",
    salaryPlaceholder: "Example: 2500000",
    yearsLabel: "Years of Contribution (fund):",
    yearsPlaceholder: "Example: 35",
    monthsConversion: "months",
    calculateButton: "CALCULATE BENEFITS",
    resultsTitle: "Calculation Results",
    resultsDesc: "Your pension benefits",
    resultsDescEmpty: "Results will appear here after calculation",
    inputSummary: "Information Summary",
    salary: "Salary",
    years: "Years",
    months: "Months",
    lumpSum: "Lump Sum",
    lumpSumDesc: "One-time payment",
    monthlyPension: "Monthly Pension",
    monthlyPensionDesc: "Retirement salary",
    additionalInfo: "Additional Information",
    yearlyPension: "Yearly pension",
    totalBenefits10Years: "Total benefits for 10 years",
    salaryPercentage: "Percentage of salary",
    explanationTitle: "Calculation Explanation",
    explanationDesc: "How calculations are performed",
    apeTitle: "APE (Average Pensionable Emoluments)",
    apeDesc: "Average salary of the last 36 months",
    lumpSumTitle: "Lump Sum",
    lumpSumExplanation: "One-time payment upon retirement",
    monthlyPensionTitle: "Monthly Pension",
    monthlyPensionExplanation: "Monthly salary after retirement",
    importantNotes: "Important to Know:",
    note1: "Years are converted to months by multiplying by 12",
    note2: "These calculations are basic and may differ from your fund's rules",
    note3: "Benefits depend on your final salary and years of contribution",
    note4: "For more details, contact your pension fund",
    errorMessage: "Please enter salary and years correctly.",
    errorRange: "Salary and years must be greater than zero.",
    fillForm: "Fill the form to see calculation results",
    appTitle: "Tanzania Pension Calculator",
    appSubtitle: "Calculate your retirement benefits with precision",
  },
  swahili: {
    calculatorTitle: "Kikokotoo cha Mafao ya Mstaafu",
    calculatorDesc: "Jaza taarifa zako ili kukokotoa mafao yako ya mstaafu",
    salaryLabel: "Mshahara Bora kwa Mwezi (Tsh):",
    salaryPlaceholder: "Mfano: 2500000",
    yearsLabel: "Miaka ya Uchangiaji (mfuko):",
    yearsPlaceholder: "Mfano: 35",
    monthsConversion: "miezi",
    calculateButton: "KOKOTOA MAFAO",
    resultsTitle: "Matokeo ya Hesabu",
    resultsDesc: "Mafao yako ya mstaafu",
    resultsDescEmpty: "Matokeo yataonekana hapa baada ya kukokotoa",
    inputSummary: "Muhtasari wa Taarifa",
    salary: "Mshahara",
    years: "Miaka",
    months: "Miezi",
    lumpSum: "Kiinua Mgongo",
    lumpSumDesc: "Pesa za mara moja",
    monthlyPension: "Pensheni ya Kila Mwezi",
    monthlyPensionDesc: "Mshahara wa mstaafu",
    additionalInfo: "Taarifa za Ziada",
    yearlyPension: "Pensheni ya mwaka",
    totalBenefits10Years: "Jumla ya mafao kwa miaka 10",
    salaryPercentage: "Asilimia ya mshahara",
    explanationTitle: "Maelezo ya Hesabu",
    explanationDesc: "Jinsi hesabu zinavyofanywa",
    apeTitle: "APE (Average Pensionable Emoluments)",
    apeDesc: "Wastani wa mshahara wa miezi 36 ya mwisho",
    lumpSumTitle: "Kiinua Mgongo",
    lumpSumExplanation: "Pesa za mara moja unapostaafu",
    monthlyPensionTitle: "Pensheni ya Mwezi",
    monthlyPensionExplanation: "Mshahara wa kila mwezi baada ya kustaafu",
    importantNotes: "Muhimu Kujua:",
    note1: "Miaka inabadilishwa kuwa miezi kwa kuzidisha na 12",
    note2: "Hesabu hizi ni za msingi na zinaweza kutofautiana na sheria za mfuko wako",
    note3: "Mafao yanategemea mshahara wako wa mwisho na miaka ya uchangiaji",
    note4: "Kwa maelezo zaidi, wasiliana na mfuko wako wa mstaafu",
    errorMessage: "Tafadhali jaza mshahara na miaka vizuri.",
    errorRange: "Mshahara na miaka lazima ziwe zaidi ya sifuri.",
    fillForm: "Jaza fomu ili kuona matokeo ya hesabu",
    appTitle: "Kikokotoo cha Mstaafu - Tanzania",
    appSubtitle: "Kokotoa mafao yako ya mstaafu kwa usahihi",
  },
}

export default function PensionCalculator() {
  const [language, setLanguage] = useState("swahili")
  const [salaryPerMonth, setSalaryPerMonth] = useState("")
  const [years, setYears] = useState("")
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")

  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "swahili" ? "eng" : "swahili")
  }

  const calculate = () => {
    const salary = Number.parseFloat(salaryPerMonth)
    const contributionYears = Number.parseFloat(years)

    if (isNaN(salary) || isNaN(contributionYears)) {
      setError(t.errorMessage)
      return
    }

    if (salary <= 0 || contributionYears <= 0) {
      setError(t.errorRange)
      return
    }

    setError("")

    // Convert years to months using formula
    const contributionMonths = contributionYears * 12

    // Original formulas preserved exactly as provided
    // Step 1: Calculate APE (mshahara bora x 36 / 3)
    const ape = (salary * 36) / 3

    // Step 2: Calculate Kiinua Mgongo
    const kiinuaMgongo = (1 / 580) * contributionMonths * ape * 0.33 * 12.5

    // Step 3: Calculate Pensheni ya Kila Mwezi
    const pensheni = (1 / 580) * contributionMonths * ape * 0.67 * (1 / 12)

    const calculationResults = {
      salary: salary,
      years: contributionYears,
      months: contributionMonths,
      ape: ape.toFixed(2),
      kiinuaMgongo: kiinuaMgongo.toFixed(2),
      pensheni: pensheni.toFixed(2),
    }

    setResults(calculationResults)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("sw-TZ").format(num)
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
              {t.appTitle}
            </h1>
            <p className="text-lg text-blue-600 font-medium">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center">
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
          >
            <Languages className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-700">{language === "swahili" ? "English" : "Kiswahili"}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">{t.calculatorTitle}</CardTitle>
                <CardDescription className="text-blue-100">{t.calculatorDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  {t.salaryLabel}
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={salaryPerMonth}
                  onChange={(e) => setSalaryPerMonth(e.target.value)}
                  placeholder={t.salaryPlaceholder}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  {t.yearsLabel}
                </Label>
                <Input
                  id="years"
                  type="number"
                  step="0.5"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder={t.yearsPlaceholder}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                {years && !isNaN(Number.parseFloat(years)) && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                      = {Number.parseFloat(years) * 12} {t.monthsConversion}
                    </Badge>
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={calculate}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                size="lg"
              >
                <Calculator className="w-5 h-5 mr-3" />
                {t.calculateButton}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">{t.resultsTitle}</CardTitle>
                <CardDescription className="text-green-100">
                  {results ? t.resultsDesc : t.resultsDescEmpty}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {results ? (
              <div className="space-y-6">
                {/* Input Summary */}
                <div className="p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    {t.inputSummary}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: t.salary,
                        value: `Tsh ${formatNumber(results.salary)}`,
                        icon: DollarSign,
                        color: "text-green-600",
                      },
                      {
                        label: t.years,
                        value: `${results.years} ${language === "eng" ? "years" : "miaka"}`,
                        icon: Calendar,
                        color: "text-purple-600",
                      },
                      {
                        label: t.months,
                        value: `${results.months} ${t.monthsConversion}`,
                        icon: Calendar,
                        color: "text-blue-600",
                      },
                      {
                        label: "APE",
                        value: `Tsh ${formatNumber(results.ape)}`,
                        icon: TrendingUp,
                        color: "text-indigo-600",
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg shadow-sm border">
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                          <span className="text-sm text-gray-600 font-medium">{item.label}:</span>
                        </div>
                        <p className="font-bold text-gray-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Results */}
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500 shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-green-800 text-lg flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          {t.lumpSum}
                        </h3>
                        <p className="text-sm text-green-600 font-medium">{t.lumpSumDesc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-700">
                          Tsh {formatNumber(results.kiinuaMgongo)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-l-4 border-purple-500 shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-purple-800 text-lg flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          {t.monthlyPension}
                        </h3>
                        <p className="text-sm text-purple-600 font-medium">{t.monthlyPensionDesc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-purple-700">Tsh {formatNumber(results.pensheni)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    {t.additionalInfo}
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      {
                        label: t.yearlyPension,
                        value: `Tsh ${formatNumber((Number.parseFloat(results.pensheni) * 12).toFixed(2))}`,
                      },
                      {
                        label: t.totalBenefits10Years,
                        value: `Tsh ${formatNumber((Number.parseFloat(results.pensheni) * 12 * 10 + Number.parseFloat(results.kiinuaMgongo)).toFixed(2))}`,
                      },
                      {
                        label: t.salaryPercentage,
                        value: `${((Number.parseFloat(results.pensheni) / Number.parseFloat(results.salary)) * 100).toFixed(1)}%`,
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                        <span className="text-blue-700 font-medium">• {item.label}:</span>
                        <span className="font-bold text-blue-800">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="p-6 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Calculator className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">{t.fillForm}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Formula Explanation Card */}
        <Card className="lg:col-span-2 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">{t.explanationTitle}</CardTitle>
                <CardDescription className="text-indigo-100">{t.explanationDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  title: t.apeTitle,
                  formula: "APE = (Mshahara × 36) ÷ 3",
                  desc: t.apeDesc,
                  gradient: "from-blue-50 to-cyan-50",
                  border: "border-blue-500",
                  textColor: "text-blue-800",
                },
                {
                  title: t.lumpSumTitle,
                  formula: "= (1/580) × Miezi × APE × 0.33 × 12.5",
                  desc: t.lumpSumExplanation,
                  gradient: "from-green-50 to-emerald-50",
                  border: "border-green-500",
                  textColor: "text-green-800",
                },
                {
                  title: t.monthlyPensionTitle,
                  formula: "= (1/580) × Miezi × APE × 0.67 × (1/12)",
                  desc: t.monthlyPensionExplanation,
                  gradient: "from-purple-50 to-indigo-50",
                  border: "border-purple-500",
                  textColor: "text-purple-800",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-5 bg-gradient-to-br ${item.gradient} rounded-xl border-l-4 ${item.border} shadow-sm`}
                >
                  <h4 className={`font-bold ${item.textColor} mb-3 text-lg`}>{item.title}</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm border">
                      <code className="text-sm font-mono text-gray-700">{item.formula}</code>
                    </div>
                    <p className={`text-sm ${item.textColor} font-medium`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-4 text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {t.importantNotes}
              </h4>
              <ul className="space-y-3">
                {[t.note1, t.note2, t.note3, t.note4].map((note, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-yellow-700">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="font-medium">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
