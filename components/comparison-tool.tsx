"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ContrastIcon as Compare, Plus, Minus } from "lucide-react"

export default function ComparisonTool() {
  const [scenarios, setScenarios] = useState([
    { id: 1, name: "Hali ya 1", salary: "", months: "", results: null },
    { id: 2, name: "Hali ya 2", salary: "", months: "", results: null },
  ])

  const addScenario = () => {
    const newId = Math.max(...scenarios.map((s) => s.id)) + 1
    setScenarios([
      ...scenarios,
      {
        id: newId,
        name: `Hali ya ${newId}`,
        salary: "",
        months: "",
        results: null,
      },
    ])
  }

  const removeScenario = (id) => {
    if (scenarios.length > 2) {
      setScenarios(scenarios.filter((s) => s.id !== id))
    }
  }

  const updateScenario = (id, field, value) => {
    setScenarios(scenarios.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const calculateScenario = (id) => {
    const scenario = scenarios.find((s) => s.id === id)
    const salary = Number.parseFloat(scenario.salary)
    const contributionMonths = Number.parseInt(scenario.months)

    if (isNaN(salary) || isNaN(contributionMonths)) {
      return
    }

    // Using the same formulas as the original calculator
    const ape = (salary * 36) / 3
    const kiinuaMgongo = (1 / 580) * contributionMonths * ape * 0.33 * 12.5
    const pensheni = (1 / 580) * contributionMonths * ape * 0.67 * (1 / 12)

    const results = {
      ape: ape.toFixed(2),
      kiinuaMgongo: kiinuaMgongo.toFixed(2),
      pensheni: pensheni.toFixed(2),
    }

    setScenarios(scenarios.map((s) => (s.id === id ? { ...s, results } : s)))
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("sw-TZ").format(num)
  }

  const getBestScenario = () => {
    const calculatedScenarios = scenarios.filter((s) => s.results)
    if (calculatedScenarios.length === 0) return null

    return calculatedScenarios.reduce((best, current) =>
      Number.parseFloat(current.results.pensheni) > Number.parseFloat(best.results.pensheni) ? current : best,
    )
  }

  const bestScenario = getBestScenario()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compare className="w-5 h-5" />
            Linganisha Hali Mbalimbali
          </CardTitle>
          <CardDescription>Linganisha matokeo ya hali tofauti za mshahara na miezi ya uchangiaji</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Hali {scenarios.length} za kulinganisha</p>
            <Button onClick={addScenario} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Ongeza Hali
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    {scenarios.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScenario(scenario.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {bestScenario && bestScenario.id === scenario.id && (
                    <Badge className="w-fit bg-green-100 text-green-800">Bora Zaidi</Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Mshahara (Tsh)</Label>
                    <Input
                      type="number"
                      value={scenario.salary}
                      onChange={(e) => updateScenario(scenario.id, "salary", e.target.value)}
                      placeholder="2500000"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Miezi ya Uchangiaji</Label>
                    <Input
                      type="number"
                      value={scenario.months}
                      onChange={(e) => updateScenario(scenario.id, "months", e.target.value)}
                      placeholder="420"
                    />
                  </div>

                  <Button onClick={() => calculateScenario(scenario.id)} className="w-full" size="sm">
                    Kokotoa
                  </Button>

                  {scenario.results && (
                    <div className="space-y-2 pt-4 border-t">
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">APE:</span>
                          <span className="font-semibold">Tsh {formatNumber(scenario.results.ape)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Kiinua Mgongo:</span>
                          <span className="font-semibold text-green-600">
                            Tsh {formatNumber(scenario.results.kiinuaMgongo)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pensheni/Mwezi:</span>
                          <span className="font-semibold text-purple-600">
                            Tsh {formatNumber(scenario.results.pensheni)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {bestScenario && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Hali Bora Zaidi</CardTitle>
            <CardDescription className="text-green-700">
              {bestScenario.name} inatoa pensheni kubwa zaidi ya kila mwezi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-green-600">Mshahara</p>
                <p className="font-bold text-green-800">Tsh {formatNumber(bestScenario.salary)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-600">Miezi</p>
                <p className="font-bold text-green-800">{bestScenario.months}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-600">Kiinua Mgongo</p>
                <p className="font-bold text-green-800">Tsh {formatNumber(bestScenario.results.kiinuaMgongo)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-600">Pensheni/Mwezi</p>
                <p className="font-bold text-green-800">Tsh {formatNumber(bestScenario.results.pensheni)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
