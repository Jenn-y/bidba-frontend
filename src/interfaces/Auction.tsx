import { Category } from "./Category";
import { Item } from "./Item";
import { User } from "./User";

export interface Auction {
	id: string;
	startDate: Date;
	endDate: Date;
	startPrice: number;
	status: string;
	item: Item;
	seller: User;
	category: Category;
}
