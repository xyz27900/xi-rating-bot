import { Module, Mutation, VuexModule } from 'vuex-class-modules';
import { Tool } from '@/models/tool.model';

@Module
export class ToolsModule extends VuexModule {
  public tool: Tool | null = null;

  @Mutation
  public setTool(tool: Tool): void {
    this.tool = tool;
  }
}
