import { Controller, Get, Param, Header } from '@nestjs/common';
import { SvgService } from './svg.service';

@Controller('image/svg')
export class SvgController {
  constructor(private readonly svgService: SvgService) {}

  @Get(['/', '/help'])
  usage() {
    return `
    用法（图片大小/图片背景颜色/图片字体颜色/图片文字）：<br>
    1. <a href="/image/svg/400x300/ccc/111">/image/svg/400x300/ccc/111</a><br>
    2. <a href="/image/svg/400">/image/svg/400</a><br>
    `;
  }

  /**
   * 返回 svg 图片
   * @param size 图片大小（宽x高）；默认 400 300
   * @param backgroundColor 图片背景颜色；默认 ccc
   * @param fontColor 图片字体颜色；默认 111
   * @param text 图片文字，居中显示
   * @returns svg 图片
   */
  @Get([
    ':size',
    ':size/:backgroundColor',
    ':size/:backgroundColor/:fontColor',
    ':size/:backgroundColor/:fontColor/:text',
  ])
  @Header('Content-Type', 'image/svg+xml')
  generateSvg(
    @Param('size') size: string,
    @Param('backgroundColor') backgroundColor?: string,
    @Param('fontColor') fontColor?: string,
    @Param('text') text?: string,
  ) {
    const size_regex = /^(\d{1,5})(?:x(\d{1,5})$|$)/;
    // 因为 url 中 # 有特殊意义，故 url 去掉了 #
    const color_regex = /^([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;
    const _size = size_regex.exec(size) || ['400x300', '400', '300'];
    if (!_size[2]) {
      _size[2] = _size[1];
    }
    const _backgroundColor = color_regex.test(backgroundColor)
      ? backgroundColor
      : 'ccc';
    const _fontColor = color_regex.test(fontColor) ? fontColor : '111';
    const _text = text || `${_size[1]}x${_size[2]}`;
    return this.svgService.generateSvg(
      parseInt(_size[1]),
      parseInt(_size[2]),
      _backgroundColor,
      _fontColor,
      _text,
    );
  }
}
