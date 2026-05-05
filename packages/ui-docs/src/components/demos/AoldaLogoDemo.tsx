import { useState } from "react";
import {
  AoldaLogo,
  PoweredByAolda,
  DropdownMenu,
  generateAoldaLogoSvg,
} from "@aolda/ui";
import {
  CodeIcon,
  DownloadSimpleIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react";

export function AoldaLogoBasicDemo() {
  return <AoldaLogo className="size-32" />;
}

export function AoldaLogoFullDemo() {
  return <AoldaLogo variant="full" className="w-72" />;
}

export function AoldaLogoSizesDemo() {
  return (
    <div className="flex flex-wrap justify-center items-end gap-6">
      <AoldaLogo className="size-10" />
      <AoldaLogo className="size-16" />
      <AoldaLogo className="size-24" />
      <AoldaLogo className="size-32" />
      <AoldaLogo variant="full" className="w-48" />
    </div>
  );
}

export function AoldaLogoCopyDemo() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (variant: "mark" | "full") => {
    await navigator.clipboard.writeText(generateAoldaLogoSvg({ variant }));
    setCopied(variant);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-aolda-brand px-4 py-3 text-white transition-opacity hover:opacity-90"
          >
            <AoldaLogo className="size-8" />
            <span className="font-medium">Logo</span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            icon={CodeIcon}
            onSelect={() => copyToClipboard("mark")}
          >
            {copied === "mark" ? "Copied!" : "Copy mark as SVG"}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            icon={CodeIcon}
            onSelect={() => copyToClipboard("full")}
          >
            {copied === "full" ? "Copied!" : "Copy full logo as SVG"}
          </DropdownMenu.Item>
          <DropdownMenu.Item icon={DownloadSimpleIcon} disabled>
            Download brand assets
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon={ArrowSquareOutIcon} disabled>
            Visit brand guidelines
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>

      <span className="text-sm text-aolda-subtle">
        Click to open the brand assets menu
      </span>
    </div>
  );
}

export function PoweredByAoldaBasicDemo() {
  return <PoweredByAolda />;
}

export function PoweredByAoldaFooterDemo() {
  return (
    <footer className="flex w-full items-center justify-between rounded-lg border border-aolda-hairline bg-aolda-elevated px-6 py-4">
      <span className="text-sm text-aolda-subtle">
        &copy; 2026 Your Company. All rights reserved.
      </span>
      <PoweredByAolda />
    </footer>
  );
}
