"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CalculationHistory({ calculations, setCalculations }) {
  const deleteCalculation = (id) => {
    setCalculations((prev) => prev.filter((calc) => calc.id !== id))
  }

  const clearAllHistory = () => {
    setCalculations([])
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("sw-TZ").format(num)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("sw-TZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (calculations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historia ya Hesabu</CardTitle>
          <CardDescription>Hesabu zako za awali zitaonekana hapa</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>Hakuna hesabu za awali. Tumia kikokotoo ili kuanza.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Historia ya Hesabu</CardTitle>
            <CardDescription>Hesabu {calculations.length} za awali</CardDescription>
          </div>
          <Button variant="destructive" size="sm" onClick={clearAllHistory}>
            <Trash2 className="w-4 h-4 mr-2" />
            Futa Zote
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calculations.map((calc) => (
              <Card key={calc.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm text-gray-500">{formatDate(calc.timestamp)}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCalculation(calc.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Mshahara
                      </Badge>
                      <p className="font-semibold">Tsh {formatNumber(calc.salary)}</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Miezi
                      </Badge>
                      <p className="font-semibold">{calc.months}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">APE</p>
                      <p className="font-bold text-blue-800">Tsh {formatNumber(calc.ape)}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 mb-1">Kiinua Mgongo</p>
                      <p className="font-bold text-green-800">Tsh {formatNumber(calc.kiinuaMgongo)}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600 mb-1">Pensheni/Mwezi</p>
                      <p className="font-bold text-purple-800">Tsh {formatNumber(calc.pensheni)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
