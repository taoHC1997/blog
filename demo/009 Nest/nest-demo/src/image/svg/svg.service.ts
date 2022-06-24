import { Injectable } from '@nestjs/common';

@Injectable()
export class SvgService {
  // 测试
  test(): string {
    return 'test';
  }

  /**
   * 生成 svg 图片
   * @param width 宽
   * @param height 高
   * @param backgroundColor 背景颜色
   * @param fontColor 字体颜色
   * @param text 文字
   * @returns svg 图片
   */
  generateSvg(
    width: number,
    height: number,
    backgroundColor: string,
    fontColor: string,
    text: string,
  ) {
    const fontSize = this.calculateScaledFontSize(width, height);
    return (
      '' +
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <rect width="${width}" height="${height}" fill="#${backgroundColor}"/>
      <text text-anchor="middle" x="${width / 2}" y="${height / 2}"
        style="fill:#${fontColor};font-weight:bold;font-size:${fontSize}px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">
        ${text}
      </text>
    </svg>`
    );
  }

  /**
   * 粗略计算字体大小
   * @param width 图片宽
   * @param height 图片高
   * @returns 字体大小
   */
  calculateScaledFontSize(width: number, height: number): number {
    return Math.round(
      Math.max(
        12,
        Math.min(
          Math.min(width, height) * 0.75,
          (0.75 * Math.max(width, height)) / 12,
        ),
      ),
    );
  }
}
