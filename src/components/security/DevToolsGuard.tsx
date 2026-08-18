"use client";

import { useEffect } from "react";

export default function DevToolsGuard() {
  useEffect(() => {
    // In chữ ký bản quyền khanhlq khi mở DevTools
    console.log(
      "%c 🌊 MAVY SEAFOOD %c Engineered by khanhlq %c https://github.com/lqkhanh295 ",
      "background: #00153D; color: #FF8A5B; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px; border: 1px solid #FF8A5B;",
      "background: #073372; color: #FFF7E8; font-weight: bold; padding: 4px 8px; border-top: 1px solid #FF8A5B; border-bottom: 1px solid #FF8A5B;",
      "background: #00153D; color: #0FA3B1; padding: 4px 8px; border-radius: 0 4px 4px 0; border: 1px solid #0FA3B1;"
    );

    // Chỉ kích hoạt chế độ chặn F12 / DevTools khi chạy môi trường Production
    if (process.env.NODE_ENV !== "production") return;

    // 1. Chặn chuột phải (Disable Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Chặn các phím tắt mở DevTools & Xem mã nguồn
    const handleKeyDown = (e: KeyboardEvent) => {
      // Chặn phím F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Chặn Ctrl+Shift+I / Cmd+Opt+I (Inspect Element)
      // Chặn Ctrl+Shift+J / Cmd+Opt+J (Console)
      // Chặn Ctrl+Shift+C / Cmd+Opt+C (Element Selector)
      if (
        isCtrlOrCmd &&
        e.shiftKey &&
        ["I", "i", "J", "j", "C", "c"].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Chặn Ctrl+U / Cmd+U (Xem mã nguồn View Source)
      if (isCtrlOrCmd && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Chặn Ctrl+S / Cmd+S (Lưu trang)
      if (isCtrlOrCmd && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return null;
}
