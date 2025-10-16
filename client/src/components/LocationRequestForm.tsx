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
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  address: z.string().min(1, "주소를 입력해주세요"),
});

export default function LocationRequestForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await apiRequest("POST", "/api/location-requests", values);
    },
    onSuccess: () => {
      toast({
        title: "신청이 완료되었습니다!",
        description: "곧 맛집 정보를 보내드리겠습니다.",
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
    <section id="location-form" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              우리 동네 맛집 찾기
            </h2>
            <p className="text-lg text-muted-foreground">
              원하시는 지역을 알려주시면 미식가가 엄선한 맛집을 추천해드립니다
            </p>
          </div>

          <Card className="p-8">
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
                          data-testid="input-location-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>찾고 싶은 지역 주소</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="서울시 강남구 역삼동" 
                          {...field}
                          data-testid="input-location-address"
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
                  data-testid="button-location-submit"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  {mutation.isPending ? "신청 중..." : "맛집 찾기 신청하기"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}
