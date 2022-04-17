import { createStore } from 'vuex';
import { AppModule } from '@/store/modules/app.module';
import { SubjectsModule } from '@/store/modules/subjects.module';
import { ToolsModule } from '@/store/modules/tools.module';

const store = createStore({});
export const appModule = new AppModule({ store, name: 'app' });
export const subjectsModule = new SubjectsModule({ store, name: 'subjects' });
export const toolsModule = new ToolsModule({ store, name: 'tools' });
