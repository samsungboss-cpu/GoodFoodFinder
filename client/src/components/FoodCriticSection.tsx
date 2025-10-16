import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, Gift, TrendingUp, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  phone: z.string().min(1, "전화번호를 입력해주세요"),
});

const qualifications = [
  "식품 관련 업계 종사자",
  "맛집 관련 SNS 보유 (팔로워 1,000명 이상)",
  "요식업 경력 3년 이상",
  "푸드 블로거 또는 유튜버"
];

const benefits = [
  {
    icon: Gift,
    title: "무료 시식 기회",
    description: "신규 오픈 맛집을 먼저 경험하세요"
  },
  {
    icon: TrendingUp,
    title: "영향력 확대",
    description: "공식 미식가로서 인지도를 높이세요"
  },
  {
    icon: Users,
    title: "네트워킹",
    description: "다른 미식가들과 교류하세요"
  },
  {
    icon: Award,
    title: "특별 혜택",
    description: "파트너 레스토랑 할인 및 우대"
  }
];

export default function FoodCriticSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await apiRequest("POST", "/api/critic-applications", values);
    },
    onSuccess: () => {
      toast({
        title: "지원이 완료되었습니다!",
        description: "검토 후 연락드리겠습니다.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "오류가 발생했습니다",
        description: error.message || "다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              맛집 분별 미식가 모집
            </h2>
            <p className="text-lg text-muted-foreground">
              진짜 맛을 아는 당신, 우리와 함께 맛집을 발굴하세요
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">미식가 자격 요건</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {qualifications.map((qual, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3"
                  data-testid={`qualification-${index}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{qual}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">미식가 혜택</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover-elevate"
                  data-testid={`benefit-card-${index}`}
                >
                  <benefit.icon className="w-10 h-10 text-primary mb-3" />
                  <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6">미식가 지원하기</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="홍길동" 
                          {...field}
                          data-testid="input-critic-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="hong@example.com" 
                          {...field}
                          data-testid="input-critic-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전화번호</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="010-1234-5678" 
                          {...field}
                          data-testid="input-critic-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={mutation.isPending}
                  data-testid="button-critic-submit"
                >
                  {mutation.isPending ? "지원 중..." : "미식가 지원하기"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}
