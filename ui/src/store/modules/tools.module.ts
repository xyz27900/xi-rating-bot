import { Tool } from '@xyz27900/xi-rating-bot-common/build/es/models/tool.model';
import { Module, Mutation, VuexModule } from 'vuex-class-modules';

@Module
export class ToolsModule extends VuexModule {
  public tools: Tool[] = [];
  public tool: Tool | null = null;

  @Mutation
  public setTools(tools: Tool[]): void {
    this.tools = tools;
    if (tools.length > 0) {
      this.tool = tools[0];
    }
  }

  @Mutation
  public setTool(tool: Tool): void {
    this.tool = tool;
  }
}
