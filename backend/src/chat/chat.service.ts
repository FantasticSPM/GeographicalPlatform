import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;
  private static model_name = 'deepseek-flash';
  // private static model_name = 'glm-5.3';
  constructor() {
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    });
  }
  async create(createChatDto: CreateChatDto) {
    const messages = createChatDto.messages;
    const tools = createChatDto.tools;
    const stream = createChatDto.stream ?? false;
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              '你是地理空间资源信息平台的智能助手，熟悉 GIS、WebGIS、地图操作、空间数据、地震与天气专题。请用简体中文提供专业、准确、简洁且可执行的回答；以平台实际功能和实时数据为准，不编造信息，遇到不确定内容请明确说明。',
          },
          ...messages,
        ],
        model: ChatService.model_name,
        // thinking: { type: 'enabled' },
        reasoning_effort: 'high',
        stream,
        tools,
      });
      return completion;
    } catch (error) {
      console.log(error);
      if (error instanceof OpenAI.RateLimitError) {
        throw new ServiceUnavailableException('AI 请求过于频繁');
      } else if (error instanceof OpenAI.AuthenticationError) {
        throw new InternalServerErrorException('AI 服务认证失败');
      } else if (error instanceof OpenAI.APIConnectionError) {
        throw new BadRequestException('网络连接异常');
      } else if (error instanceof OpenAI.BadRequestError) {
        throw new BadRequestException(error.message);
      } else if (error instanceof OpenAI.APIConnectionError) {
        throw new ServiceUnavailableException('AI 服务连接失败');
      } else if (error instanceof OpenAI.APIConnectionTimeoutError) {
        throw new RequestTimeoutException('AI 服务请求超时');
      } else if (error instanceof OpenAI.APIError) {
        throw new InternalServerErrorException('AI 服务异常');
      } else {
        throw error;
      }
    }
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
