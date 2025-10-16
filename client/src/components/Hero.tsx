import { MapPin, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToForm = () => {
    const element = document.getElementById('location-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              진짜 맛집을
              <br />
              <span className="text-primary">찾아드립니다</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              광고가 아닌, 미식가가 엄선한 숨은 맛집을 만나보세요.
              <br />
              당신의 동네에서 진정한 맛의 경험을 시작합니다.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={scrollToForm}
              data-testid="button-hero-cta"
            >
              <MapPin className="w-5 h-5 mr-2" />
              맛집 찾기 시작하기
            </Button>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative bg-card border border-card-border rounded-2xl p-12 flex items-center justify-center">
                <Utensils className="w-48 h-48 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
