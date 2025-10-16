import { Shield, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Shield,
    title: "광고 없는 진정한 추천",
    description: "광고비를 받지 않는 순수한 미식가의 추천만을 제공합니다"
  },
  {
    icon: Star,
    title: "검증된 미식가의 선택",
    description: "식품 업계 전문가와 맛집 인플루언서가 직접 방문하고 검증합니다"
  },
  {
    icon: TrendingUp,
    title: "숨은 맛집 발굴",
    description: "대중에게 알려지지 않은 진짜 맛집을 가장 먼저 만나보세요"
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">왜 맛집찾아를 이용해야 할까요?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            우리는 진짜 맛집만을 추천합니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="p-6 hover-elevate"
              data-testid={`card-benefit-${index}`}
            >
              <benefit.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
