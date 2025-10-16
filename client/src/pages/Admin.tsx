import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogOut, MapPin, Users, Megaphone } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

// TODO: remove mock data
const mockLocationRequests = [
  { id: 1, name: "김철수", address: "서울시 강남구 역삼동", createdAt: "2024-01-15" },
  { id: 2, name: "이영희", address: "서울시 송파구 잠실동", createdAt: "2024-01-14" },
  { id: 3, name: "박민수", address: "경기도 성남시 분당구", createdAt: "2024-01-13" },
];

const mockCriticApplications = [
  { id: 1, name: "최요리", email: "chef@example.com", phone: "010-1111-2222", createdAt: "2024-01-15" },
  { id: 2, name: "정미식", email: "foodie@example.com", phone: "010-3333-4444", createdAt: "2024-01-14" },
];

const mockAdvertiserApplications = [
  { id: 1, companyName: "맛있는 식당", representative: "홍대표", phone: "02-1234-5678", email: "info@tasty.com", createdAt: "2024-01-15" },
  { id: 2, companyName: "진짜 맛집", representative: "김사장", phone: "02-8765-4321", email: "contact@real.com", createdAt: "2024-01-14" },
];

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin = (values: z.infer<typeof loginSchema>) => {
    if (values.username === "admin" && values.password === "123456") {
      setIsLoggedIn(true);
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    form.reset();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">관리자 로그인</h1>
            <p className="text-muted-foreground">맛집찾아 관리 시스템</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin" 
                        {...field}
                        data-testid="input-admin-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="••••••" 
                        {...field}
                        data-testid="input-admin-password"
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
                data-testid="button-admin-login"
              >
                로그인
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-card-border sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">맛집찾아 관리자</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="locations" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="locations" data-testid="tab-locations">
              <MapPin className="w-4 h-4 mr-2" />
              위치 신청
            </TabsTrigger>
            <TabsTrigger value="critics" data-testid="tab-critics">
              <Users className="w-4 h-4 mr-2" />
              미식가 신청
            </TabsTrigger>
            <TabsTrigger value="advertisers" data-testid="tab-advertisers">
              <Megaphone className="w-4 h-4 mr-2" />
              광고주 신청
            </TabsTrigger>
          </TabsList>

          <TabsContent value="locations">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">맛집 위치 신청 목록</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>주소</TableHead>
                        <TableHead>신청일</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLocationRequests.map((request) => (
                        <TableRow key={request.id} data-testid={`row-location-${request.id}`}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell className="font-medium">{request.name}</TableCell>
                          <TableCell>{request.address}</TableCell>
                          <TableCell>{request.createdAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="critics">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">미식가 지원 목록</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>전화번호</TableHead>
                        <TableHead>지원일</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCriticApplications.map((application) => (
                        <TableRow key={application.id} data-testid={`row-critic-${application.id}`}>
                          <TableCell>{application.id}</TableCell>
                          <TableCell className="font-medium">{application.name}</TableCell>
                          <TableCell>{application.email}</TableCell>
                          <TableCell>{application.phone}</TableCell>
                          <TableCell>{application.createdAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advertisers">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">광고주 신청 목록</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>번호</TableHead>
                        <TableHead>기업명</TableHead>
                        <TableHead>대표자</TableHead>
                        <TableHead>전화번호</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>신청일</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAdvertiserApplications.map((application) => (
                        <TableRow key={application.id} data-testid={`row-advertiser-${application.id}`}>
                          <TableCell>{application.id}</TableCell>
                          <TableCell className="font-medium">{application.companyName}</TableCell>
                          <TableCell>{application.representative}</TableCell>
                          <TableCell>{application.phone}</TableCell>
                          <TableCell>{application.email}</TableCell>
                          <TableCell>{application.createdAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
