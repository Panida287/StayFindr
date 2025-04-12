type Owner = {
	name?: string;
	email?: string;
	bio?: string;
	avatar?: {
		url: string;
		alt: string;
	};
};

type Props = {
	owner: Owner;
};

export default function OwnerInfo({ owner }: Props) {
	return (
		<div className="mt-8 border-t pt-4">
			<h2 className="text-lg font-semibold mb-2">Hosted by</h2>
			<div className="flex items-center gap-4">
				<img
					src={owner.avatar?.url || 'https://placehold.co/80x80'}
					alt={owner.avatar?.alt || owner.name}
					className="w-16 h-16 rounded-full object-cover border"
				/>
				<div>
					<p className="font-medium">{owner.name}</p>
					<p className="text-sm text-gray-500">{owner.email}</p>
					{owner.bio && (
						<p className="text-sm mt-1">{owner.bio}</p>
					)}
				</div>
			</div>
		</div>
	);
}