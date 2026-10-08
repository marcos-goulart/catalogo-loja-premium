import { CONTACT } from "@/lib/productsMock";
import { AtSign, Mail, MapPin, MessageCircle } from "lucide-react";

export function ContactFooter() {
  return (
    <footer id="contato" className="border-t border-border bg-muted/40 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Fale conosco
        </p>
        <h2 className="mt-4 text-center text-2xl font-light tracking-tight md:text-3xl">
          Atendimento personalizado
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <MessageCircle className="mx-auto h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              WhatsApp
            </p>
            <p className="mt-1 text-sm">+55 21 99999-9999</p>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="group">
            <Mail className="mx-auto h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              E-mail
            </p>
            <p className="mt-1 text-sm">{CONTACT.email}</p>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group">
            <AtSign className="mx-auto h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Instagram
            </p>
            <p className="mt-1 text-sm">{CONTACT.instagram}</p>
          </a>
          <div>
            <MapPin className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Ateliê
            </p>
            <p className="mt-1 text-sm">{CONTACT.city}</p>
          </div>
        </div>
        <p className="mt-12 text-center text-[10px] tracking-[0.3em] text-muted-foreground">
          © 2026 MODA PREMIUM
        </p>
      </div>
    </footer>
  );
}
