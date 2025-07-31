import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';

export default function FeedbackPage() {
  // --- 状态管理 ---

  // 用于存储 Cloudflare Turnstile 验证成功后返回的令牌（token）。
  // 初始值为 null，表示用户尚未完成验证。
  const [token, setToken] = useState<string | null>(null);

  // 控制提交按钮是否应被禁用。
  // 初始值为 true，因为用户必须先完成人机验证才能提交。
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // 跟踪表单是否正在提交中。
  // 用于在网络请求期间禁用按钮并显示加载状态，防止重复提交。
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Ref 管理 ---

  // 创建一个 Ref，用于引用将要承载 Turnstile 小部件的 div 元素。
  const turnstileRef = useRef<HTMLDivElement>(null);
  // 创建一个 Ref，用于存储 Turnstile 成功渲染后返回的 widgetId。
  // 这对于在组件卸载时正确地清理小部件至关重要。
  const widgetIdRef = useRef<string | null>(null);

  // --- 生命周期管理 ---
  
  // 这个 useEffect 负责管理 Cloudflare Turnstile 小部件的完整生命周期。
  useEffect(() => {
    // 如果 Ref 容器还未准备好，则不执行任何操作。
    if (!turnstileRef.current) {
      return;
    }

    const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

    // 定义一个渲染函数，用于初始化 Turnstile 小部件。
    const renderWidget = () => {
      // 再次确认容器存在且 Turnstile 的全局对象 'window.turnstile' 已被加载。
      if (turnstileRef.current && window.turnstile) {
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAABnKFFiD6uDn0-Xa', // 请替换为您的 Site Key
          callback: handleSuccess, // 成功验证后的回调函数
          theme: 'auto',
        });
        // 将返回的 widgetId 存储在 Ref 中，以便后续清理。
        widgetIdRef.current = widgetId;
      }
    };

    // --- 脚本加载与渲染逻辑 ---

    // 检查 Turnstile 脚本是否已经加载。
    if (window.turnstile) {
      // 如果已加载，直接渲染小部件。
      renderWidget();
    } else {
      // 如果未加载，则动态创建 script 标签来加载它。
      // 我们在 window 上定义一个全局回调函数，并通过 URL 参数 '?onload=' 告诉 Turnstile 脚本加载完成后调用它。
      (window as any).onloadTurnstileCallback = renderWidget;

      const script = document.createElement('script');
      script.src = `${SCRIPT_URL}?onload=onloadTurnstileCallback`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // --- 清理逻辑 ---

    // useEffect 的返回函数是一个清理函数，它会在组件卸载时执行。
    return () => {
      // 如果 widgetIdRef.current 中有值，说明我们已经渲染了一个小部件。
      if (widgetIdRef.current && window.turnstile) {
        // 调用 turnstile.remove 来彻底销毁该小部件，防止内存泄漏和状态冲突。
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []); // 空依赖数组 [] 确保此 effect 只在组件首次挂载时运行一次，并在卸载时执行一次清理。

  // --- 事件处理函数 ---

  /**
   * 处理表单提交事件。
   * @param event - React 的表单事件对象。
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 1. 阻止表单的默认提交行为，即阻止页面重新加载。
    event.preventDefault();
    
    // 2. 安全检查：确保在提交前已经获取到了 Turnstile 令牌。
    if (!token) {
      alert('请先完成人机验证。');
      return; // 提前退出函数，不执行后续操作。
    }

    // 3. 进入提交流程，更新 UI 状态。
    setIsSubmitting(true);     // 将状态设置为“正在提交”，用于更新按钮文本。
    setIsSubmitDisabled(true); // 禁用按钮，防止用户在提交过程中再次点击。

    // 4. 从表单中提取数据。
    // `event.currentTarget` 指向触发表单提交的 <form> DOM 元素。
    const formData = new FormData(event.currentTarget);
    const data = {
      // 使用 .get() 方法根据 input 的 name 属性获取值。
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      // 将获取到的 Turnstile 令牌一并加入到要发送的数据中。
      turnstileToken: token,
    };

    // 5. 执行异步网络请求。
    try {
      // console.log('正在发送请求到:', 'https://interface.ric.moe/api/feedback');
      // console.log('请求数据:', data);
      
      // 使用 fetch API 向后端发送 POST 请求。
      const response = await fetch('https://interface.ric.moe/api/feedback', {
        method: 'POST', // 指定请求方法。
        mode: 'cors', // 明确指定 CORS 模式
        credentials: 'omit', // 不发送凭据
        headers: {
          // 告知服务器请求体是 JSON 格式。
          'Content-Type': 'application/json',
        },
        // 将 JavaScript 对象转换为 JSON 字符串作为请求体发送。
        body: JSON.stringify(data),
      });

      // console.log('响应状态:', response.status);
      // console.log('响应头:', response.headers);

      // 6. 解析服务器返回的 JSON 数据。
      // 根据新的 API 约定，无论业务成功或失败，服务器都会返回 200 OK 状态码。
      // 因此，我们需要检查响应体中的 'code' 字段来判断真实的结果。
      const result = await response.json();

      // 7. 根据 'code' 字段处理业务逻辑结果。
      if (result.code === 0) {
        // 'code' 为 0 表示业务处理成功。
        // alert(result.message || '反馈提交成功！感谢您的意见。');
        alert('反馈提交成功！感谢您的意见。');
        // 可选：成功后调用表单的 reset() 方法清空所有输入字段。
        event.currentTarget.reset();
      } else {
        // 'code' 不为 0 表示业务处理失败，将服务器返回的 message 显示给用户。
        alert(`提交失败：${result.message || '未知错误，请稍后重试。'}`);
      }
    } catch (error) {
      // 8. 捕获网络层面的错误或 JSON 解析错误。
      // 例如：用户断网、DNS解析失败、服务器网关崩溃（502/504）等。

      //console.error('提交反馈时发生网络错误:', error);
      //alert('提交过程中发生网络错误，请检查您的网络连接并重试。');
    } finally {
      // 9. `finally` 块中的代码无论成功还是失败都会执行，非常适合用于清理工作。
      setIsSubmitting(false); // 无论结果如何，都结束“正在提交”状态。
      
      // 提交完成后，将按钮重新设置为禁用状态，
      // 等待下一次 Turnstile 验证成功后再启用。
      // 注意：Turnstile 验证成功一次后，通常需要重置才能再次验证。
      // 当前组件会自动处理大部分情况，但如果遇到问题，可能需要手动调用重置。
      setIsSubmitDisabled(true);
    }
  };

  /**
   * Cloudflare Turnstile 验证成功时的回调函数。
   * @param token - 由 Cloudflare 返回的验证令牌。
   */
  const handleSuccess = (token: string) => {
    // console.log('Turnstile 验证成功，令牌:', token);
    // 将获取到的令牌存入 state。
    setToken(token);
    // 验证成功，将提交按钮设置为可用状态。
    setIsSubmitDisabled(false);
  };

  return (
    <Layout title='Feedback' description='RICMOE Feedback page'>
      <div className={styles.feedbackContainer}>
        <div className={styles.feedbackFormWrapper}>
          <div className={clsx(styles.feedbackForm, "shadow--md")}>
            <form id="feedback-form" onSubmit={handleSubmit}>
              <h1 className={styles.title}><Translate id="feedback.title" description="Feedback form title">Feedback Form</Translate></h1>
              <p className={styles.description}>
                <Translate id="feedback.description" description="Feedback form description">
                  我们非常重视您的意见，请告诉我们您的想法。
                </Translate>
              </p>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  <Translate id="feedback.name" description="Feedback form name label">
                    USERNAME
                  </Translate>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <Translate id="feedback.email" description="Feedback form email label">
                    EMAIL
                  </Translate>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  <Translate id="feedback.content" description="Feedback form message label">
                    Feedback Content
                  </Translate>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className={styles.textarea}
                ></textarea>
              </div>
            </form>
            <div className='verificationContainer margin-bottom--md' style={{ display: 'flex'}}>
              <span className='margin-right--md'>Verification</span>
              <span className='text--italic text--info' 
              onClick={() => {alert('请等候 Cloudflare Turnstile 验证器加载，若长时间无加载，请刷新页面重试，或更换网路再试一次。')}}>
                Tips
              </span>
            </div>
            <div className={styles.formGroup}>
              {/* 这是 Turnstile 小部件的容器，我们把 ref 附加到这里。 */}
              <div ref={turnstileRef} />
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                form="feedback-form"
                className={styles.submitButton}
                disabled={isSubmitDisabled || isSubmitting}
              >
                {isSubmitting ? '正在提交...' : '提交'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}