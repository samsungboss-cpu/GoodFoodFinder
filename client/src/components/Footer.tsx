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
import { Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  companyName: z.string().min(1, "기업명을 입력해주세요"),
  representative: z.string().min(1, "대표자명을 입력해주세요"),
  phone: z.string().min(1, "전화번호를 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
});

export default function Footer() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      representative: "",
      phone: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await apiRequest("POST", "/api/advertiser-applications", values);
    },
    onSuccess: () => {
      toast({
        title: "광고 신청이 완료되었습니다!",
        description: "담당자가 곧 연락드리겠습니다.",
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
    <footer className="bg-card border-t border-card-border">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-background">
            <div className="text-center mb-8">
              <Megaphone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">광고주 모집</h2>
              <p className="text-muted-foreground">
                진짜 맛집을 찾는 고객들에게 여러분의 레스토랑을 소개하세요
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>기업명</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="맛있는 식당" 
                            {...field}
                            data-testid="input-advertiser-company"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="representative"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>대표자명</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="홍길동" 
                            {...field}
                            data-testid="input-advertiser-representative"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>전화번호</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="02-1234-5678" 
                            {...field}
                            data-testid="input-advertiser-phone"
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
                            placeholder="info@restaurant.com" 
                            {...field}
                            data-testid="input-advertiser-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-chart-3 hover:bg-chart-3 text-white" 
                  size="lg"
                  disabled={mutation.isPending}
                  data-testid="button-advertiser-submit"
                >
                  {mutation.isPending ? "신청 중..." : "광고 신청하기"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>

        <div className="border-t border-border pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">맛집찾아</h3>
              <p className="text-sm text-muted-foreground">
                진짜 맛집을 찾아드리는 서비스
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">사업자 정보</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>사업자명: 맛집찾아</li>
                <li>개인정보책임자: 이재영</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">오시는 길</h4>
              <p className="text-sm text-muted-foreground">
                서울특별시 성북구 정릉로 77
                <br />
                국민대학교 경영관
              </p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 맛집찾아. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
