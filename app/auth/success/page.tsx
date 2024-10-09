import { CheckCircle, Mail, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background p-6 space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for registering. Your application is now pending approval.
          </p>
        </div>

        <div className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertTitle>Check Your Email</AlertTitle>
            <AlertDescription>
              Once approved, we'll send you a QR Code via email. Please check your inbox (and spam folder) regularly.
            </AlertDescription>
          </Alert>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Approval Time</AlertTitle>
            <AlertDescription>
              The approval process may take anywhere from a few hours up to 1 day. We appreciate your patience.
            </AlertDescription>
          </Alert>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          If you have any questions, please contact our support team.
        </p>
      </div>
    </div>
  )
}