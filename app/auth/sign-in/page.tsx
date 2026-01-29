import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-page flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <p className="text-sm text-gray-500">Access admin or customer account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button className="w-full">Sign in</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
