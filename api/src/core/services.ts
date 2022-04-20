import { container } from 'tsyringe';
import { GIFT_REPOSITORY, giftRepository } from '@/repository/gift.repository';
import { HARVEST_LINK_REPOSITORY, harvestLinkRepository } from '@/repository/harvest.link.repository';
import { HARVEST_REPOSITORY, harvestRepository } from '@/repository/harvest.repository';
import { MESSAGE_RATING_REPOSITORY, messageRatingRepository } from '@/repository/message.rating.repository';
import { TOOL_REPOSITORY, toolRepository } from '@/repository/tool.repository';
import { USER_GIFT_REPOSITORY, userGiftRepository } from '@/repository/user.gift.repository';
import { USER_REPOSITORY, userRepository } from '@/repository/user.repository';
import { USER_TOOL_REPOSITORY, userToolRepository } from '@/repository/user.tool.repository';
import { GiftService } from '@/service/gift.service';
import { HarvestService } from '@/service/harvest.service';
import { MessageRatingService } from '@/service/message.rating.service';
import { TipService } from '@/service/tip.service';
import { ToolService } from '@/service/tool.service';
import { UserService } from '@/service/user.service';

container
  .register(GIFT_REPOSITORY, { useValue: giftRepository })
  .register(HARVEST_LINK_REPOSITORY, { useValue: harvestLinkRepository })
  .register(HARVEST_REPOSITORY, { useValue: harvestRepository })
  .register(MESSAGE_RATING_REPOSITORY, { useValue: messageRatingRepository })
  .register(TOOL_REPOSITORY, { useValue: toolRepository })
  .register(USER_GIFT_REPOSITORY, { useValue: userGiftRepository })
  .register(USER_REPOSITORY, { useValue: userRepository })
  .register(USER_TOOL_REPOSITORY, { useValue: userToolRepository });

export const giftService = container.resolve(GiftService);
export const harvestService = container.resolve(HarvestService);
export const messageRatingService = container.resolve(MessageRatingService);
export const tipService = container.resolve(TipService);
export const toolService = container.resolve(ToolService);
export const userService = container.resolve(UserService);
