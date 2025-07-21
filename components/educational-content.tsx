"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calculator, TrendingUp, AlertCircle, CheckCircle, Info } from "lucide-react"

export default function EducationalContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Elimu ya Mafao ya Mstaafu
          </CardTitle>
          <CardDescription>Jifunze kuhusu mfumo wa mafao ya mstaafu Tanzania</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Misingi</TabsTrigger>
          <TabsTrigger value="calculations">Hesabu</TabsTrigger>
          <TabsTrigger value="tips">Ushauri</TabsTrigger>
          <TabsTrigger value="faq">Maswali</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ni Nini Mafao ya Mstaafu?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Mafao ya mstaafu ni pesa unazopokea baada ya kustaafu kutoka kazini. Hii ni faida muhimu inayokusaidia
                kuishi vizuri baada ya kustaafu.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Kiinua Mgongo</h4>
                  <p className="text-sm text-blue-700">
                    Ni kiasi cha pesa unachopokea mara moja unapostaafu. Hiki ni kama akiba yako ya mara moja.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Pensheni ya Mwezi</h4>
                  <p className="text-sm text-green-700">
                    Ni kiasi cha pesa unachopokea kila mwezi baada ya kustaafu. Hii ni kama mshahara wako wa mstaafu.
                  </p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Mafao yako yanategemea mshahara wako na miezi ya uchangiaji kwenye mfuko wa mstaafu.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mahitaji ya Msingi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Umri wa Kustaafu</p>
                    <p className="text-sm text-gray-600">Kwa kawaida ni miaka 60 kwa wafanyakazi wa kawaida</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Miezi ya Uchangiaji</p>
                    <p className="text-sm text-gray-600">Angalau miezi 180 (miaka 15) ya uchangiaji</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Uchangiaji wa Kila Mwezi</p>
                    <p className="text-sm text-gray-600">Lazima uwe unachangia kila mwezi wakati wa kazi</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Jinsi Hesabu Zinavyofanywa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold text-blue-800 mb-2">Hatua ya 1: Hesabu APE</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    APE (Average Pensionable Emoluments) ni wastani wa mshahara wako wa miezi 36 ya mwisho.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">APE = (Mshahara Bora × 36) ÷ 3</code>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    Mfano: Mshahara = 2,500,000, basi APE = (2,500,000 × 36) ÷ 3 = 30,000,000
                  </p>
                </div>

                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold text-green-800 mb-2">Hatua ya 2: Hesabu Kiinua Mgongo</h4>
                  <p className="text-sm text-green-700 mb-2">
                    Kiinua mgongo ni kiasi unachopokea mara moja unapostaafu.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">Kiinua Mgongo = (1/580) × Miezi × APE × 0.33 × 12.5</code>
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    Mfano: Miezi = 420, APE = 30,000,000, basi Kiinua Mgongo = (1/580) × 420 × 30,000,000 × 0.33 × 12.5
                  </p>
                </div>

                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-semibold text-purple-800 mb-2">Hatua ya 3: Hesabu Pensheni ya Mwezi</h4>
                  <p className="text-sm text-purple-700 mb-2">
                    Pensheni ya mwezi ni kiasi unachopokea kila mwezi baada ya kustaafu.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">Pensheni = (1/580) × Miezi × APE × 0.67 × (1/12)</code>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">
                    Mfano: Miezi = 420, APE = 30,000,000, basi Pensheni = (1/580) × 420 × 30,000,000 × 0.67 × (1/12)
                  </p>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Hesabu hizi ni za msingi. Matokeo halisi yanaweza kutofautiana kulingana na sheria za mfuko wako wa
                  mstaafu.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Ushauri wa Kuongeza Mafao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800">Njia za Kuongeza Mafao</h4>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-100 text-green-800">1</Badge>
                      <div>
                        <p className="font-medium">Ongeza Mshahara</p>
                        <p className="text-sm text-gray-600">Jitahidi kupata ongezeko la mshahara au cheo cha juu</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-100 text-green-800">2</Badge>
                      <div>
                        <p className="font-medium">Fanya Kazi Kwa Muda Mrefu</p>
                        <p className="text-sm text-gray-600">Miezi zaidi ya uchangiaji inamaanisha mafao makubwa</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-100 text-green-800">3</Badge>
                      <div>
                        <p className="font-medium">Changiza Ziada</p>
                        <p className="text-sm text-gray-600">Baadhi ya mifuko inaruhusu uchangiaji wa ziada</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-800">Makosa ya Kuepuka</h4>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Kuacha Kuchangia</p>
                        <p className="text-sm text-gray-600">Usikate uchangiaji hata kama una changamoto za kifedha</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Kustaafu Mapema</p>
                        <p className="text-sm text-gray-600">
                          Kustaafu kabla ya umri wa kawaida kunaweza kupunguza mafao
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Kutojua Haki Zako</p>
                        <p className="text-sm text-gray-600">Jifunze kuhusu haki zako na mafao unayostahili</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mipango ya Ziada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Akiba za Binafsi</h4>
                  <p className="text-sm text-yellow-700">Weka akiba za ziada kando ya mfuko wa mstaafu</p>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Uwekezaji</h4>
                  <p className="text-sm text-indigo-700">Wekeza katika biashara au mali za kutoa mapato</p>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-800 mb-2">Bima ya Maisha</h4>
                  <p className="text-sm text-pink-700">Nunua bima ya maisha kwa usalama wa familia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maswali Yanayoulizwa Mara Kwa Mara</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Je, naweza kupokea mafao yangu kabla ya kustaafu?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Kwa kawaida, mafao ya mstaafu yanapokewa baada ya kustaafu. Lakini kuna hali maalum kama ugonjwa
                    mkubwa au ajali ambapo unaweza kupokea sehemu ya mafao mapema.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Je, mafao yangu yanaongezeka kila mwaka?</h4>
                  <p className="text-sm text-gray-600">
                    Ndiyo, mafao ya mstaafu kwa kawaida yanaongezeka kila mwaka kulingana na mfumuko wa bei na sera za
                    serikali.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Nini kitatokea kama nitakufa kabla ya kustaafu?</h4>
                  <p className="text-sm text-gray-600">
                    Familia yako itapokea mafao ya kifo ambayo ni sehemu ya kiasi ulichokuwa unachangia. Hii ni faida
                    muhimu ya mfuko wa mstaafu.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Je, naweza kuhamisha mafao yangu kwa mfuko mwingine?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Kulingana na sheria za nchi, unaweza kuhamisha mafao yako kwa mfuko mwingine unapobadili kazi.
                    Lakini sharti za uhamishaji zinatofautiana.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Ni nini kitatokea kama sitachangia kwa miezi kadhaa?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ukikosa kuchangia, mafao yako yanaweza kupungua. Ni muhimu kuendelea kuchangia hata kama una
                    changamoto za kifedha. Ongea na mfuko wako kuhusu njia za kulipa deni.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Je, naweza kuongeza uchangiaji wangu wa kila mwezi?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Baadhi ya mifuko inaruhusu uchangiaji wa ziada (voluntary contributions). Hii ni njia nzuri ya
                    kuongeza mafao yako ya baadaye. Uliza mfuko wako kuhusu fursa hii.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mawasiliano Muhimu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">NSSF (National Social Security Fund)</h4>
                  <p className="text-sm text-blue-700 mb-2">Kwa wafanyakazi wa sekta ya umma</p>
                  <p className="text-xs text-blue-600">Simu: +255 22 211 8891</p>
                  <p className="text-xs text-blue-600">Tovuti: www.nssf.or.tz</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">PPF (Parastatal Pensions Fund)</h4>
                  <p className="text-sm text-green-700 mb-2">Kwa wafanyakazi wa mashirika ya umma</p>
                  <p className="text-xs text-green-600">Simu: +255 22 211 4327</p>
                  <p className="text-xs text-green-600">Tovuti: www.ppftz.org</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
