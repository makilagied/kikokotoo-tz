"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Share2, Printer } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ExportTools({ calculations }) {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("sw-TZ").format(num)
  }

  const exportToCSV = () => {
    if (calculations.length === 0) return

    const headers = ["Tarehe", "Mshahara", "Miezi", "APE", "Kiinua Mgongo", "Pensheni ya Mwezi"]
    const csvContent = [
      headers.join(","),
      ...calculations.map((calc) =>
        [
          new Date(calc.timestamp).toLocaleDateString("sw-TZ"),
          calc.salary,
          calc.months,
          calc.ape,
          calc.kiinuaMgongo,
          calc.pensheni,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "hesabu-za-mstaafu.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const generateReport = () => {
    if (calculations.length === 0) return

    const latest = calculations[0]
    const averages = calculations.reduce(
      (acc, calc) => {
        acc.salary += Number.parseFloat(calc.salary)
        acc.months += Number.parseFloat(calc.months)
        acc.pensheni += Number.parseFloat(calc.pensheni)
        return acc
      },
      { salary: 0, months: 0, pensheni: 0 },
    )

    const count = calculations.length
    Object.keys(averages).forEach((key) => {
      averages[key] = averages[key] / count
    })

    const reportContent = `
RIPOTI YA MAFAO YA MSTAAFU
==========================

Tarehe ya Ripoti: ${new Date().toLocaleDateString("sw-TZ")}
Idadi ya Hesabu: ${calculations.length}

HESABU YA HIVI KARIBUNI:
-----------------------
Mshahara wa Mwezi: Tsh ${formatNumber(latest.salary)}
Miezi ya Uchangiaji: ${latest.months}
APE: Tsh ${formatNumber(latest.ape)}
Kiinua Mgongo: Tsh ${formatNumber(latest.kiinuaMgongo)}
Pensheni ya Kila Mwezi: Tsh ${formatNumber(latest.pensheni)}

WASTANI WA HESABU ZOTE:
----------------------
Wastani wa Mshahara: Tsh ${formatNumber(averages.salary.toFixed(0))}
Wastani wa Miezi: ${averages.months.toFixed(0)}
Wastani wa Pensheni: Tsh ${formatNumber(averages.pensheni.toFixed(0))}

HISTORIA YA HESABU:
------------------
${calculations
  .map(
    (calc, index) => `
${index + 1}. Tarehe: ${new Date(calc.timestamp).toLocaleDateString("sw-TZ")}
   Mshahara: Tsh ${formatNumber(calc.salary)}
   Miezi: ${calc.months}
   Pensheni: Tsh ${formatNumber(calc.pensheni)}
`,
  )
  .join("")}

Ripoti imetengenezwa na Mfumo Mkuu wa Mafao ya Mstaafu
    `

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ripoti-ya-mstaafu.txt"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const printReport = () => {
    if (calculations.length === 0) return

    const latest = calculations[0]
    const printWindow = window.open("", "_blank")
    printWindow.document.write(`
      <html>
        <head>
          <title>Ripoti ya Mafao ya Mstaafu</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .calculation { border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RIPOTI YA MAFAO YA MSTAAFU</h1>
            <p>Tarehe: ${new Date().toLocaleDateString("sw-TZ")}</p>
          </div>
          
          <div class="section">
            <h2>Hesabu ya Hivi Karibuni</h2>
            <div class="calculation">
              <p><strong>Mshahara wa Mwezi:</strong> Tsh ${formatNumber(latest.salary)}</p>
              <p><strong>Miezi ya Uchangiaji:</strong> ${latest.months}</p>
              <p><strong>APE:</strong> Tsh ${formatNumber(latest.ape)}</p>
              <p><strong>Kiinua Mgongo:</strong> Tsh ${formatNumber(latest.kiinuaMgongo)}</p>
              <p><strong>Pensheni ya Kila Mwezi:</strong> Tsh ${formatNumber(latest.pensheni)}</p>
            </div>
          </div>

          <div class="section">
            <h2>Historia ya Hesabu</h2>
            <table>
              <tr>
                <th>Tarehe</th>
                <th>Mshahara</th>
                <th>Miezi</th>
                <th>Pensheni/Mwezi</th>
              </tr>
              ${calculations
                .map(
                  (calc) => `
                <tr>
                  <td>${new Date(calc.timestamp).toLocaleDateString("sw-TZ")}</td>
                  <td>Tsh ${formatNumber(calc.salary)}</td>
                  <td>${calc.months}</td>
                  <td>Tsh ${formatNumber(calc.pensheni)}</td>
                </tr>
              `,
                )
                .join("")}
            </table>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const shareResults = async () => {
    if (calculations.length === 0) return

    const latest = calculations[0]
    const shareText = `Matokeo ya Hesabu za Mstaafu:
Mshahara: Tsh ${formatNumber(latest.salary)}
Miezi: ${latest.months}
Pensheni ya Mwezi: Tsh ${formatNumber(latest.pensheni)}
Kiinua Mgongo: Tsh ${formatNumber(latest.kiinuaMgongo)}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Matokeo ya Mafao ya Mstaafu",
          text: shareText,
        })
      } catch (error) {
        console.log("Sharing failed:", error)
      }
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Matokeo yamenakiliwa kwenye clipboard!")
    }
  }

  if (calculations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ripoti na Uhamishaji
          </CardTitle>
          <CardDescription>Hamisha na shiriki matokeo yako</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>Hakuna data ya kuhamisha. Fanya hesabu kwanza ili kupata ripoti.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ripoti na Uhamishaji
          </CardTitle>
          <CardDescription>Hamisha matokeo yako katika mifumo mbalimbali</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button onClick={exportToCSV} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Hamisha CSV
            </Button>

            <Button onClick={generateReport} variant="outline" className="flex items-center gap-2 bg-transparent">
              <FileText className="w-4 h-4" />
              Tengeneza Ripoti
            </Button>

            <Button onClick={printReport} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Printer className="w-4 h-4" />
              Chapisha
            </Button>

            <Button onClick={shareResults} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Shiriki
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Muhtasari wa Data</CardTitle>
          <CardDescription>Takwimu za jumla za hesabu zako</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{calculations.length}</p>
              <p className="text-sm text-blue-700">Hesabu Zote</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-600">
                Tsh {formatNumber(Math.max(...calculations.map((c) => Number.parseFloat(c.pensheni))))}
              </p>
              <p className="text-sm text-green-700">Pensheni Kubwa</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-600">
                Tsh {formatNumber(Math.max(...calculations.map((c) => Number.parseFloat(c.kiinuaMgongo))))}
              </p>
              <p className="text-sm text-purple-700">Kiinua Mgongo Kubwa</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {Math.max(...calculations.map((c) => Number.parseInt(c.months)))}
              </p>
              <p className="text-sm text-orange-700">Miezi Mengi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
