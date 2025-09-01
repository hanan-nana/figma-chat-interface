figma.showUI(__html__, { width: 640, height: 800 });

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
