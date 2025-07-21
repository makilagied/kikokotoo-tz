"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, DollarSign, Calendar, PieChart } from "lucide-react"

export default function PensionChart({ calculations }) {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("sw-TZ").format(num)
  }

  if (calculations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Michoro ya Takwimu
          </CardTitle>
          <CardDescription>Michoro ya mafao yako ya mstaafu</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>Hakuna data ya kuonyesha. Fanya hesabu kwanza ili kuona michoro.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const latestCalculation = calculations[0]
  const averages = calculations.reduce(
    (acc, calc) => {
      acc.salary += Number.parseFloat(calc.salary)
      acc.months += Number.parseFloat(calc.months)
      acc.ape += Number.parseFloat(calc.ape)
      acc.kiinuaMgongo += Number.parseFloat(calc.kiinuaMgongo)
      acc.pensheni += Number.parseFloat(calc.pensheni)
      return acc
    },
    { salary: 0, months: 0, ape: 0, kiinuaMgongo: 0, pensheni: 0 },
  )

  const count = calculations.length
  Object.keys(averages).forEach((key) => {
    averages[key] = averages[key] / count
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hesabu Zote</p>
                <p className="text-2xl font-bold text-blue-600">{calculations.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wastani Mshahara</p>
                <p className="text-lg font-bold text-green-600">Tsh {formatNumber(averages.salary.toFixed(0))}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wastani Miezi</p>
                <p className="text-2xl font-bold text-purple-600">{averages.months.toFixed(0)}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wastani Pensheni</p>
                <p className="text-lg font-bold text-orange-600">Tsh {formatNumber(averages.pensheni.toFixed(0))}</p>
              </div>
              <PieChart className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hesabu ya Hivi Karibuni</CardTitle>
          <CardDescription>Matokeo ya hesabu ya mwisho</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Maingizo</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mshahara wa Mwezi:</span>
                  <span className="font-semibold">Tsh {formatNumber(latestCalculation.salary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Miezi ya Uchangiaji:</span>
                  <span className="font-semibold">{latestCalculation.months}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Matokeo</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">APE:</span>
                  <span className="font-semibold text-blue-600">Tsh {formatNumber(latestCalculation.ape)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kiinua Mgongo:</span>
                  <span className="font-semibold text-green-600">
                    Tsh {formatNumber(latestCalculation.kiinuaMgongo)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pensheni/Mwezi:</span>
                  <span className="font-semibold text-purple-600">Tsh {formatNumber(latestCalculation.pensheni)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mlinganisho wa Takwimu</CardTitle>
          <CardDescription>Linganisha hesabu zako na wastani</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calculations.slice(0, 5).map((calc, index) => (
              <div key={calc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">Mshahara: Tsh {formatNumber(calc.salary)}</p>
                    <p className="text-sm text-gray-500">Miezi: {calc.months}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-600">Tsh {formatNumber(calc.pensheni)}</p>
                  <p className="text-sm text-gray-500">kwa mwezi</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
