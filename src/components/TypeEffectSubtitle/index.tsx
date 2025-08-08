import React, { useEffect, useState } from 'react';
// 移除對 'typed.js' 的直接導入，改為動態載入

// 定義 SubTitleConfig 的類型接口 (沒有改變)
interface SubTitleConfig {
  effect: boolean;
  loop: boolean;
  source: number;
  sub?: string[];
  startDelay: number;
  typeSpeed: number;
  backSpeed: number;
}

// 更新 ThemeConfig 接口，使其包含 subtitleConfig
interface ThemeConfig {
  subtitleConfig?: SubTitleConfig; // 允许 subtitleConfig 可选，兼容 Docusaurus 默认类型
  // 其他 Docusaurus 标准 themeConfig 属性可选
}

interface FooterSubtitleProps {
  themeConfig: ThemeConfig;
}

// 輔助函數：動態加載腳本
const getScript = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.body.appendChild(script);
  });
};

// 聲明 Typed 類型，使其在全局 window 對象上可用
declare global {
  interface Window {
    Typed: any; // Typed.js 的類型定義，如果需要更精確，可以安裝 @types/typed.js
    str: string[]; // Yijuzhan 提供的全局變數
    jinrishici: {
      load: (callback: (result: { data: { content: string } }) => void) => void;
    };
  }
}

function TypeEffectSubtitle({ themeConfig }: FooterSubtitleProps): JSX.Element {
  // 防御性处理，避免 subtitleConfig 不存在时报错
  if (!themeConfig || !themeConfig.subtitleConfig) {
    return <span id="footer-type-tips" className="footer__subtitle"></span>;
  }
  const { effect, loop, source, sub, startDelay, typeSpeed, backSpeed } = themeConfig.subtitleConfig;
  const [typedInstance, setTypedInstance] = useState<any | null>(null);
  const subContent: string[] = Array.isArray(sub) ? sub : [];

  useEffect(() => {
    const footerTypeTips = document.getElementById('footer-type-tips');
    if (!footerTypeTips) {
      console.error("Element with ID 'footer-type-tips' not found.");
      return;
    }

    const subtitleType = async (): Promise<void> => {
      // 清理之前的 Typed 實例
      if (typedInstance) {
        typedInstance.destroy();
        setTypedInstance(null);
      }

      let stringsToType: string[] = [];
      let displayContent: string = '';

      // 確保 Typed.js 腳本已載入
      if (effect && typeof window.Typed === 'undefined') {
        try {
          // await getScript('https://cdn.jsdelivr.net/npm/typed.js@2.0.12/lib/typed.min.js');
          await getScript('https://unpkg.com/typed.js@2.0.12/lib/typed.min.js');//针对国内使用unpkg
        } catch (error) {
          console.error('Error loading typed.js script:', error);
          displayContent = subContent[0] || '加載打字效果失敗';
          footerTypeTips.innerHTML = displayContent;
          return;
        }
      }

      switch (source) {
        case 1: // Hitokoto 一言
          try {
            const response = await fetch('https://v1.hitokoto.cn');
            const data: { hitokoto: string; from: string } = await response.json();
            if (effect) {
              const from = '出自 ' + data.from;
              stringsToType = [...subContent];
              stringsToType.unshift(data.hitokoto, from);
            } else {
              displayContent = data.hitokoto;
            }
          } catch (error) {
            console.error('Error fetching hitokoto:', error);
            displayContent = subContent[0] || '加載一言失敗';
          }
          break;
        case 2: // Yijuzhan 句子迷
          try {
            await getScript('https://yijuzhan.com/api/word.php?m=js');
            const yijuzhanStr = window.str;
            if (yijuzhanStr && yijuzhanStr.length >= 2) {
              const con = yijuzhanStr[0] ?? '';
              if (effect) {
                const from = '出自 ' + (yijuzhanStr[1] ?? '');
                stringsToType = [...subContent];
                stringsToType.unshift(con, from);
              } else {
                displayContent = con;
              }
            } else {
              console.error('Yijuzhan script did not provide expected data (window.str).');
              displayContent = subContent[0] || '加載句子迷失敗';
            }
          } catch (error) {
            console.error('Error fetching yijuzhan script:', error);
            displayContent = subContent[0] || '加載句子迷失敗';
          }
          break;
        case 3: // Jinrishici 今日詩詞
          try {
            await getScript('https://sdk.jinrishici.com/v2/browser/jinrishici.js');
            await new Promise<void>(resolve => {
              const jinrishici = window.jinrishici;
              if (jinrishici && typeof jinrishici.load === 'function') {
                jinrishici.load((result: { data: { content: string } }) => {
                  if (effect) {
                    const content = result.data.content;
                    stringsToType = [...subContent];
                    stringsToType.unshift(content);
                  } else {
                    displayContent = result.data.content;
                  }
                  resolve();
                });
              } else {
                console.error('Jinrishici script did not provide expected API (window.jinrishici).');
                displayContent = subContent[0] || '加載今日詩詞失敗';
                resolve();
              }
            });
          } catch (error) {
            console.error('Error fetching jinrishici script or data:', error);
            displayContent = subContent[0] || '加載今日詩詞失敗';
          }
          break;
        default:
          if (effect) {
            stringsToType = subContent.length ? subContent : ['請在 Docusaurus 配置中設定副標題'];
          } else {
            displayContent = subContent[0] || '請在 Docusaurus 配置中設定副標題';
          }
          break;
      }

      if (effect) {
        if (typeof window.Typed !== 'undefined') {
          const newTypedInstance = new window.Typed('#footer-type-tips', {
            strings: stringsToType,
            startDelay: startDelay,
            typeSpeed: typeSpeed,
            loop: loop,
            backSpeed: backSpeed,
          });
          setTypedInstance(newTypedInstance);
        } else {
          footerTypeTips.innerHTML = displayContent || subContent[0] || '加載打字效果失敗';
        }
      } else {
        footerTypeTips.innerHTML = displayContent;
      }
    };

    subtitleType();

    return () => {
      if (typedInstance) {
        typedInstance.destroy();
      }
    };
  }, [effect, loop, source, subContent, startDelay, typeSpeed, backSpeed]);

  return (
    <span id="footer-type-tips" className="footer__subtitle"></span>
  );
}

export default TypeEffectSubtitle;
