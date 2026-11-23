import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AskAssistantDto } from './dto/ask-assistant.dto';
import type { AssistantReplyDto } from './dto/assistant-reply.dto';
import { SearchKnowledgeUseCase } from '../../../../application/use-cases/search-knowledge.use-case';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly searchKnowledgeUseCase: SearchKnowledgeUseCase) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  async ask(@Body() dto: AskAssistantDto): Promise<AssistantReplyDto> {
    const result = await this.searchKnowledgeUseCase.execute({
      query: dto.query,
      language: dto.language ?? 'es',
    });

    return {
      topicId: result.topicId,
      title: result.title,
      content: result.content,
      action: result.action,
      sources: result.sources,
      matched: result.matched,
      score: result.score,
    };
  }
}
