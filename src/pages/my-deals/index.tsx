import { useGetDealsQuery } from "@/api/apiSlice";
import { Card, Layout, Loader, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useTranslation } from "react-i18next";
import { DealCard } from "./components/DealCard";
import withAuth, { UserContext } from "@/hocs/with-auth";
import { useContext, useEffect, useState } from "react";
import { DealPayload } from "@/types/deal";

const MyDealsPage = () => {
  const { t } = useTranslation();
  const user = useContext(UserContext);
  const { data, isLoading, refetch } = useGetDealsQuery();
  const [myDeals, setMyDeals] = useState<DealPayload[]>([]);

  useEffect(() => {
    if (data) {
      setMyDeals(
        data.list.filter(({ requestedItem, offeredItem }: DealPayload) => requestedItem.userId === user.id || offeredItem.userId === user.id)
      );
    }
  }, [data, setMyDeals]);

  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      <Card className='mt-8'>
        <h2 className='text-3xl font-semibold mb-6'>{t("Outcoming deals")}</h2>
        {isLoading ? (
          <Loader className='mx-auto mt-4' />
        ) : myDeals.filter(({ requestedItem }) => requestedItem.userId !== user.id).length > 0 ? (
          <div className='[&>*]:w-1/2 below-768:[&>*]:w-full gap-4 flex flex-wrap'>
            {myDeals
              .filter(({ requestedItem }) => requestedItem.userId !== user.id)
              .map(({ status, offeredItem, requestedItem, id }) => (
                <DealCard
                  key={id}
                  id={id}
                  myDeal={offeredItem.userId === user.id}
                  offered={offeredItem}
                  requested={requestedItem}
                  status={status}
                  refetch={refetch}
                />
              ))}
          </div>
        ) : (
          <span className='text-xl font-semibold'>{t("You don't have any outcoming deals yet")}</span>
        )}
      </Card>
      <Card className='mt-8'>
        <h2 className='text-3xl font-semibold mb-6'>{t("Incoming deals")}</h2>
        {isLoading ? (
          <Loader className='mx-auto mt-4' />
        ) : myDeals.filter(({ requestedItem }) => requestedItem.userId === user.id).length > 0 ? (
          <div className='[&>*]:w-1/2 below-768:[&>*]:w-full gap-4 flex flex-wrap'>
            {myDeals
              .filter(({ requestedItem }) => requestedItem.userId === user.id)
              .map(({ status, offeredItem, requestedItem, id }) => (
                <DealCard
                  key={id}
                  id={id}
                  incoming
                  myDeal={offeredItem.userId === user.id}
                  offered={offeredItem}
                  requested={requestedItem}
                  status={status}
                  refetch={refetch}
                />
              ))}
          </div>
        ) : (
          <span className='text-xl font-semibold'>{t("You don't have any incoming deals yet")}</span>
        )}
      </Card>
    </Layout>
  );
};

export default withAuth(MyDealsPage);
