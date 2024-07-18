import { useState } from "react";
import { CGUModalProps } from "@/types/interfaces";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// ****************************************************

export function CGUModal({
  buttonText,
  buttonVariant,
  title,
  noText,
  yesText,
  onConfirm,
}: CGUModalProps) {
  const [openForm, setOpenForm] = useState(false); // to close the form after submit

  const handleConfirm = (isConfirmed: boolean) => {
    onConfirm(isConfirmed);
    setOpenForm(false);
  };

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <span className="block whitespace-normal">{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[75vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center m-2 text-2xl">
            {title}
          </DialogTitle>
          <DialogDescription>
            <p className="text-center m-2">
              <strong>Acceptance of the Terms</strong>
            </p>
            <p>
              By accessing and using this website Hygi-checker, you accept and
              agree to be bound by these Terms and Conditions. If you do not
              agree to these terms, please do not use this website.
            </p>

            <p className="text-center m-2">
              <strong>Changes to the Terms</strong>
            </p>
            <p>
              Hygi-checker reserves the right to modify these Terms and
              Conditions at any time without prior notice. It is your
              responsibility to review this page regularly to take notice of any
              changes. Your continued use of the website after the posting of
              changes constitutes your acceptance of those changes.
            </p>

            <p className="text-center m-2">
              <strong>Use of the Website</strong>
            </p>
            <p>
              The content of this website, including but not limited to text,
              images, graphics, and other materials, is protected by copyright
              and other intellectual property laws. Any unauthorized use of
              these contents is prohibited.
            </p>

            <p>
              By using this website, you agree not to:
              <ul>
                <li>
                  Post or transmit any unlawful, threatening, defamatory,
                  obscene, or otherwise objectionable material.
                </li>
                <li>
                  Use this website to violate the legal rights of others or to
                  collect or store personal data about other users without their
                  consent.
                </li>
              </ul>
            </p>

            <p className="text-center m-2">
              <strong>User Accounts</strong>
            </p>
            <p>
              To access certain features of the website, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account. You agree to notify Hygi-checker
              immediately of any unauthorized use of your account.
            </p>

            <p className="text-center m-2">
              <strong>Links to Third-Party Sites</strong>
            </p>
            <p>
              This website may contain links to third-party websites. These
              links are provided solely for your convenience. Hygi-checker does
              not endorse the content of these third-party sites and is not
              responsible for their availability or content.
            </p>

            <p className="text-center m-2">
              <strong>Limitation of Liability</strong>
            </p>
            <p>
              To the fullest extent permitted by law, Hygi-checker disclaims all
              liability for any direct, indirect, incidental, consequential, or
              other damages resulting from the use or inability to use this
              website or any content, services, or features of this website.
            </p>

            <p className="text-center m-2">
              <strong>Indemnification</strong>
            </p>
            <p>
              You agree to indemnify and hold harmless Hygi-checker, its
              officers, employees, and agents from any claims, losses, damages,
              liabilities, and costs (including legal fees) arising from your
              use of this website or your violation of these Terms and
              Conditions.
            </p>

            <p className="text-center m-2">
              <strong>Governing Law</strong>
            </p>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of France. You agree to submit to the
              exclusive jurisdiction of the courts of France for any disputes
              arising out of or relating to these Terms and Conditions.
            </p>

            <p className="text-center m-2">
              <strong>Contact</strong>
            </p>
            <p>
              If you have any questions regarding these Terms and Conditions,
              please contact us at hygichecker@gmail.com.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            title="You must validate the terms and conditions to be able to register"
            variant="ghost"
            onClick={() => handleConfirm(false)}
          >
            {noText}
          </Button>
          <Button variant="default" onClick={() => handleConfirm(true)}>
            {yesText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
