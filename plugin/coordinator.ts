// 메인 스레드: Figma 문서 접근, UI 표시/메시징
figma.showUI(__html__, { width: 800, height: 1200 }); // manifest.ui 로부터 생성된 __html__ 사용

// UI → 메인 메시지 처리
figma.ui.onmessage = async (msg) => {
  if (msg.type === "GET_VARIABLES") {
    const vars = await figma.variables.getLocalVariablesAsync();
    const data = await Promise.all(
      vars.map(async (v) => ({
        id: v.id,
        name: v.name,
        resolvedType: v.resolvedType,
        valuesByMode: v.valuesByMode,
      }))
    );
    figma.ui.postMessage({ type: "VARIABLES", payload: data });
  }

  if (msg.type === "CLOSE") figma.closePlugin();
};
